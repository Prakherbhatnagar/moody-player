const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ImageKit = require('imagekit');
const Song = require('../models/Song');
const auth = require('../middleware/auth');

const router = express.Router();

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /mp3|wav|ogg|m4a/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith('audio/');

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'));
    }
  }
});

// Get songs by mood
router.get('/', async (req, res) => {
  try {
    const { mood, genre, limit = 20, page = 1 } = req.query;
    
    const query = { isActive: true };
    if (mood) query.mood = mood;
    if (genre) query.genre = genre;

    const songs = await Song.find(query)
      .populate('uploadedBy', 'username profile.firstName profile.lastName')
      .sort({ 'stats.playCount': -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Song.countDocuments(query);

    res.json({
      songs,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: songs.length,
        totalSongs: total
      }
    });
  } catch (error) {
    console.error('Fetch songs error:', error);
    res.status(500).json({
      error: 'Failed to fetch songs',
      message: error.message
    });
  }
});

// Search songs
router.get('/search', async (req, res) => {
  try {
    const { q, mood, genre, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const songs = await Song.searchSongs(q, mood);
    const limitedSongs = songs.slice(0, parseInt(limit));

    res.json({
      songs: limitedSongs,
      query: q,
      count: limitedSongs.length
    });
  } catch (error) {
    console.error('Search songs error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

// Get popular songs by mood
router.get('/popular/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const { limit = 10 } = req.query;

    const songs = await Song.getPopularByMood(mood, parseInt(limit));

    res.json({ songs });
  } catch (error) {
    console.error('Popular songs error:', error);
    res.status(500).json({
      error: 'Failed to fetch popular songs',
      message: error.message
    });
  }
});

// Upload new song
router.post('/upload', auth, upload.single('audio'), async (req, res) => {
  try {
    const { title, artist, mood, genre, album, year } = req.body;
    const audioFile = req.file;

    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    // Upload to ImageKit
    const uploadResult = await imagekit.upload({
      file: audioFile.buffer,
      fileName: `${Date.now()}-${audioFile.originalname}`,
      folder: '/moody-player/audio',
      useUniqueFileName: true,
      tags: ['audio', mood, genre].filter(Boolean)
    });

    // Create song record
    const song = new Song({
      title,
      artist,
      mood,
      genre,
      audioUrl: uploadResult.url,
      fileSize: audioFile.size,
      fileFormat: path.extname(audioFile.originalname).slice(1),
      metadata: {
        album,
        year: year ? parseInt(year) : undefined
      },
      uploadedBy: req.userId
    });

    await song.save();

    res.status(201).json({
      message: 'Song uploaded successfully',
      song
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: error.message
    });
  }
});

// Get single song
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate('uploadedBy', 'username profile.firstName profile.lastName');
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    res.json({ song });
  } catch (error) {
    console.error('Get song error:', error);
    res.status(500).json({
      error: 'Failed to fetch song',
      message: error.message
    });
  }
});

// Play song (increment play count)
router.post('/:id/play', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await song.incrementPlayCount();

    res.json({ message: 'Play count updated' });
  } catch (error) {
    console.error('Play song error:', error);
    res.status(500).json({
      error: 'Failed to update play count',
      message: error.message
    });
  }
});

// Like song
router.post('/:id/like', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    song.stats.likeCount += 1;
    await song.save();

    res.json({ message: 'Song liked successfully' });
  } catch (error) {
    console.error('Like song error:', error);
    res.status(500).json({
      error: 'Failed to like song',
      message: error.message
    });
  }
});

// Update song
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, artist, mood, genre } = req.body;
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Check if user owns the song
    if (song.uploadedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this song' });
    }

    // Update fields
    if (title) song.title = title;
    if (artist) song.artist = artist;
    if (mood) song.mood = mood;
    if (genre) song.genre = genre;

    await song.save();

    res.json({
      message: 'Song updated successfully',
      song
    });
  } catch (error) {
    console.error('Update song error:', error);
    res.status(500).json({
      error: 'Failed to update song',
      message: error.message
    });
  }
});

// Delete song
router.delete('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Check if user owns the song
    if (song.uploadedBy.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this song' });
    }

    // Soft delete
    song.isActive = false;
    await song.save();

    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Delete song error:', error);
    res.status(500).json({
      error: 'Failed to delete song',
      message: error.message
    });
  }
});

// Get user's uploaded songs
router.get('/user/uploaded', auth, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const songs = await Song.find({ uploadedBy: req.userId, isActive: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Song.countDocuments({ uploadedBy: req.userId, isActive: true });

    res.json({
      songs,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: songs.length,
        totalSongs: total
      }
    });
  } catch (error) {
    console.error('User songs error:', error);
    res.status(500).json({
      error: 'Failed to fetch user songs',
      message: error.message
    });
  }
});

module.exports = router;
