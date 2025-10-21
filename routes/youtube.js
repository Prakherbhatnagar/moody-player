const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// YouTube API configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Search for music videos based on mood
router.get('/search/:mood', async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const { mood } = req.params;
    const { q: query, maxResults = 10 } = req.query;
    
    // Map mood to search terms
    const moodTerms = {
      'happy': 'happy upbeat music',
      'sad': 'sad melancholy music',
      'angry': 'rock metal music',
      'calm': 'ambient chill music',
      'excited': 'electronic dance music'
    };

    const searchTerm = query || moodTerms[mood] || 'music';
    
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: searchTerm,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: maxResults,
        key: YOUTUBE_API_KEY
      }
    });

    const videos = response.data.items || [];
    
    res.json({
      mood,
      searchTerm,
      videos: videos.map(video => ({
        id: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`
      }))
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'Failed to search videos' });
  }
});

// Get music video for specific track
router.get('/video/:track/:artist', async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const { track, artist } = req.params;
    const searchQuery = `${track} ${artist} music video`;
    
    const response = await axios.get(`${YOUTUBE_BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: searchQuery,
        type: 'video',
        videoCategoryId: '10', // Music category
        maxResults: 5,
        key: YOUTUBE_API_KEY
      }
    });

    const videos = response.data.items || [];
    
    res.json({
      track,
      artist,
      searchQuery,
      videos: videos.map(video => ({
        id: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`
      }))
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'Failed to find video' });
  }
});

// Get trending music videos
router.get('/trending', async (req, res) => {
  try {
    if (!YOUTUBE_API_KEY) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    const { maxResults = 20 } = req.query;
    
    const response = await axios.get(`${YOUTUBE_BASE_URL}/videos`, {
      params: {
        part: 'snippet,statistics',
        chart: 'mostPopular',
        videoCategoryId: '10', // Music category
        maxResults: maxResults,
        key: YOUTUBE_API_KEY
      }
    });

    const videos = response.data.items || [];
    
    res.json({
      videos: videos.map(video => ({
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail: video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
        channelTitle: video.snippet.channelTitle,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        url: `https://www.youtube.com/watch?v=${video.id}`
      }))
    });

  } catch (error) {
    console.error('YouTube API error:', error);
    res.status(500).json({ error: 'Failed to fetch trending videos' });
  }
});

module.exports = router;
