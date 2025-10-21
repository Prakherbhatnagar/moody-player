const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Last.fm API configuration
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_SECRET = process.env.LASTFM_SECRET;
const LASTFM_CALLBACK_URL = process.env.LASTFM_CALLBACK_URL || 'https://moody-player-ai.vercel.app/api/lastfm/callback';
const LASTFM_BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

// Last.fm authentication endpoints
router.get('/auth', (req, res) => {
  try {
    if (!LASTFM_API_KEY) {
      return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    const authUrl = `https://www.last.fm/api/auth/?api_key=${LASTFM_API_KEY}&cb=${encodeURIComponent(LASTFM_CALLBACK_URL)}`;
    
    res.json({
      message: 'Redirect to Last.fm for authentication',
      authUrl: authUrl,
      redirect: authUrl
    });
  } catch (error) {
    console.error('Last.fm auth error:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// Handle Last.fm callback
router.get('/callback', async (req, res) => {
  try {
    const { token } = req.query;
    
    if (!token) {
      return res.status(400).json({ error: 'No token provided' });
    }

    if (!LASTFM_API_KEY || !LASTFM_SECRET) {
      return res.status(500).json({ error: 'Last.fm credentials not configured' });
    }

    // Get session key from token
    const response = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: 'auth.getSession',
        api_key: LASTFM_API_KEY,
        token: token,
        api_sig: generateApiSig({
          method: 'auth.getSession',
          api_key: LASTFM_API_KEY,
          token: token
        }),
        format: 'json'
      }
    });

    const session = response.data.session;
    
    res.json({
      message: 'Last.fm authentication successful',
      session: {
        key: session.key,
        name: session.name,
        subscriber: session.subscriber
      }
    });

  } catch (error) {
    console.error('Last.fm callback error:', error);
    res.status(500).json({ error: 'Failed to authenticate with Last.fm' });
  }
});

// Generate API signature for Last.fm
function generateApiSig(params) {
  const crypto = require('crypto');
  const sortedParams = Object.keys(params).sort().map(key => `${key}${params[key]}`).join('');
  return crypto.createHash('md5').update(sortedParams + LASTFM_SECRET).digest('hex');
}

// Get similar tracks based on mood
router.get('/similar/:mood', async (req, res) => {
  try {
    if (!LASTFM_API_KEY) {
      return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    const { mood } = req.params;
    
    // Map mood to Last.fm tags
    const moodTags = {
      'happy': 'happy upbeat pop',
      'sad': 'sad melancholy indie',
      'angry': 'rock metal aggressive',
      'calm': 'ambient chill acoustic',
      'excited': 'electronic dance energetic'
    };

    const tag = moodTags[mood] || 'music';
    
    const response = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: 'tag.gettoptracks',
        tag: tag,
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: 20
      }
    });

    const tracks = response.data.toptracks?.track || [];
    
    res.json({
      mood,
      tracks: tracks.map(track => ({
        name: track.name,
        artist: track.artist.name,
        playcount: track.playcount,
        url: track.url,
        image: track.image?.[2]?.['#text'] || null
      }))
    });

  } catch (error) {
    console.error('Last.fm API error:', error);
    res.status(500).json({ error: 'Failed to fetch similar tracks' });
  }
});

// Get music recommendations based on artist
router.get('/recommendations/:artist', async (req, res) => {
  try {
    if (!LASTFM_API_KEY) {
      return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    const { artist } = req.params;
    
    const response = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: 'artist.getsimilar',
        artist: artist,
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: 10
      }
    });

    const artists = response.data.similarartists?.artist || [];
    
    res.json({
      originalArtist: artist,
      similarArtists: artists.map(artist => ({
        name: artist.name,
        match: artist.match,
        url: artist.url,
        image: artist.image?.[2]?.['#text'] || null
      }))
    });

  } catch (error) {
    console.error('Last.fm API error:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Get top tracks by tag
router.get('/toptracks/:tag', async (req, res) => {
  try {
    if (!LASTFM_API_KEY) {
      return res.status(500).json({ error: 'Last.fm API key not configured' });
    }

    const { tag } = req.params;
    
    const response = await axios.get(LASTFM_BASE_URL, {
      params: {
        method: 'tag.gettoptracks',
        tag: tag,
        api_key: LASTFM_API_KEY,
        format: 'json',
        limit: 15
      }
    });

    const tracks = response.data.toptracks?.track || [];
    
    res.json({
      tag,
      tracks: tracks.map(track => ({
        name: track.name,
        artist: track.artist.name,
        playcount: track.playcount,
        url: track.url,
        image: track.image?.[2]?.['#text'] || null
      }))
    });

  } catch (error) {
    console.error('Last.fm API error:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

module.exports = router;
