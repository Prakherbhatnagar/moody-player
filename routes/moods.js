const express = require('express');
const User = require('../models/User');
const Song = require('../models/Song');
const auth = require('../middleware/auth');

const router = express.Router();

// Get mood statistics
router.get('/stats', async (req, res) => {
  try {
    const moodStats = await Song.aggregate([
      { $match: { isActive: true } },
      { $group: { 
        _id: '$mood', 
        count: { $sum: 1 },
        totalPlays: { $sum: '$stats.playCount' },
        avgPlays: { $avg: '$stats.playCount' }
      }},
      { $sort: { count: -1 } }
    ]);

    const totalSongs = await Song.countDocuments({ isActive: true });
    const totalPlays = await Song.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: '$stats.playCount' } }}
    ]);

    res.json({
      moodStats,
      totalSongs,
      totalPlays: totalPlays[0]?.total || 0
    });
  } catch (error) {
    console.error('Mood stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch mood statistics',
      message: error.message
    });
  }
});

// Get user's mood history
router.get('/history', auth, async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const moodHistory = user.preferences.moodHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice((parseInt(page) - 1) * parseInt(limit), parseInt(page) * parseInt(limit));

    res.json({
      moodHistory,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(user.preferences.moodHistory.length / parseInt(limit)),
        count: moodHistory.length,
        totalHistory: user.preferences.moodHistory.length
      }
    });
  } catch (error) {
    console.error('Mood history error:', error);
    res.status(500).json({
      error: 'Failed to fetch mood history',
      message: error.message
    });
  }
});

// Add mood detection to user history
router.post('/detect', auth, async (req, res) => {
  try {
    const { mood, songId } = req.body;
    
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add mood to history
    user.preferences.moodHistory.unshift({
      mood,
      timestamp: new Date(),
      songId: songId || null
    });

    // Keep only last 100 mood detections
    if (user.preferences.moodHistory.length > 100) {
      user.preferences.moodHistory = user.preferences.moodHistory.slice(0, 100);
    }

    await user.save();

    res.json({
      message: 'Mood detection recorded',
      mood,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Mood detection error:', error);
    res.status(500).json({
      error: 'Failed to record mood detection',
      message: error.message
    });
  }
});

// Get mood trends for user
router.get('/trends', auth, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

    const recentMoods = user.preferences.moodHistory
      .filter(mood => new Date(mood.timestamp) >= cutoffDate);

    // Count moods by day
    const moodTrends = {};
    recentMoods.forEach(mood => {
      const date = new Date(mood.timestamp).toISOString().split('T')[0];
      if (!moodTrends[date]) {
        moodTrends[date] = {};
      }
      moodTrends[date][mood.mood] = (moodTrends[date][mood.mood] || 0) + 1;
    });

    // Get overall mood distribution
    const moodDistribution = {};
    recentMoods.forEach(mood => {
      moodDistribution[mood.mood] = (moodDistribution[mood.mood] || 0) + 1;
    });

    res.json({
      trends: moodTrends,
      distribution: moodDistribution,
      totalDetections: recentMoods.length,
      period: `${days} days`
    });
  } catch (error) {
    console.error('Mood trends error:', error);
    res.status(500).json({
      error: 'Failed to fetch mood trends',
      message: error.message
    });
  }
});

// Get mood-based recommendations
router.get('/recommendations/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const { limit = 10 } = req.query;

    // Get popular songs for this mood
    const popularSongs = await Song.getPopularByMood(mood, parseInt(limit));

    // Get similar moods
    const similarMoods = {
      happy: ['surprised', 'neutral'],
      sad: ['neutral', 'fearful'],
      neutral: ['happy', 'sad'],
      angry: ['disgusted', 'fearful'],
      surprised: ['happy', 'neutral'],
      disgusted: ['angry', 'sad'],
      fearful: ['sad', 'disgusted']
    };

    const similarMoodSongs = await Song.find({
      mood: { $in: similarMoods[mood] || [] },
      isActive: true
    })
    .sort({ 'stats.playCount': -1 })
    .limit(parseInt(limit) / 2);

    const recommendations = [...popularSongs, ...similarMoodSongs]
      .sort((a, b) => b.stats.playCount - a.stats.playCount)
      .slice(0, parseInt(limit));

    res.json({
      recommendations,
      mood,
      count: recommendations.length
    });
  } catch (error) {
    console.error('Mood recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get mood recommendations',
      message: error.message
    });
  }
});

// Get mood insights
router.get('/insights', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const moodHistory = user.preferences.moodHistory;
    
    if (moodHistory.length === 0) {
      return res.json({
        insights: [],
        message: 'No mood data available yet'
      });
    }

    // Calculate insights
    const insights = [];

    // Most common mood
    const moodCounts = {};
    moodHistory.forEach(mood => {
      moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
    });

    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b
    );

    insights.push({
      type: 'most_common_mood',
      title: 'Your Most Common Mood',
      value: mostCommonMood,
      description: `You've been ${mostCommonMood} ${moodCounts[mostCommonMood]} times`
    });

    // Mood frequency
    const totalDetections = moodHistory.length;
    const moodFrequency = Object.keys(moodCounts).map(mood => ({
      mood,
      count: moodCounts[mood],
      percentage: Math.round((moodCounts[mood] / totalDetections) * 100)
    }));

    insights.push({
      type: 'mood_frequency',
      title: 'Mood Distribution',
      data: moodFrequency
    });

    // Recent mood trend
    const recentMoods = moodHistory.slice(0, 7);
    const recentTrend = recentMoods.map(mood => mood.mood);
    
    insights.push({
      type: 'recent_trend',
      title: 'Recent Mood Trend',
      data: recentTrend,
      description: `Your mood over the last ${recentMoods.length} detections`
    });

    res.json({
      insights,
      totalDetections,
      userSince: user.createdAt
    });
  } catch (error) {
    console.error('Mood insights error:', error);
    res.status(500).json({
      error: 'Failed to generate mood insights',
      message: error.message
    });
  }
});

module.exports = router;
