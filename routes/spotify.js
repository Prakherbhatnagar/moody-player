const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

// Spotify API configuration
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';

// Get Spotify access token
const getSpotifyToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
        }
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Spotify token error:', error);
    throw error;
  }
};

// Search tracks by mood
router.get('/search/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    // Mood to genre mapping
    const moodToGenres = {
      happy: 'pop,dance,electronic,reggae',
      sad: 'blues,jazz,folk,indie',
      neutral: 'ambient,instrumental,classical',
      angry: 'rock,metal,punk,alternative',
      surprised: 'experimental,world,new-age',
      disgusted: 'industrial,noise,experimental',
      fearful: 'ambient,dark-ambient,experimental'
    };

    const genres = moodToGenres[mood] || 'pop';
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        q: `genre:${genres}`,
        type: 'track',
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });

    const tracks = response.data.tracks.items.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: Math.floor(track.duration_ms / 1000),
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify,
      image: track.album.images[0]?.url,
      mood: mood,
      source: 'spotify'
    }));

    res.json({
      tracks,
      mood,
      total: response.data.tracks.total,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: response.data.tracks.next !== null
      }
    });
  } catch (error) {
    console.error('Spotify search error:', error);
    res.status(500).json({
      error: 'Failed to search Spotify',
      message: error.message
    });
  }
});

// Get track details
router.get('/track/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const token = await getSpotifyToken();

    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const track = response.data;
    const trackData = {
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: Math.floor(track.duration_ms / 1000),
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify,
      image: track.album.images[0]?.url,
      popularity: track.popularity,
      explicit: track.explicit,
      releaseDate: track.album.release_date
    };

    res.json({ track: trackData });
  } catch (error) {
    console.error('Spotify track error:', error);
    res.status(500).json({
      error: 'Failed to fetch track details',
      message: error.message
    });
  }
});

// Get recommendations based on mood
router.get('/recommendations/:mood', async (req, res) => {
  try {
    const { mood } = req.params;
    const { limit = 20 } = req.query;

    // Mood to seed parameters mapping
    const moodSeeds = {
      happy: { seed_genres: 'pop,dance,electronic', target_valence: 0.8, target_energy: 0.8 },
      sad: { seed_genres: 'blues,jazz,folk', target_valence: 0.2, target_energy: 0.3 },
      neutral: { seed_genres: 'ambient,instrumental', target_valence: 0.5, target_energy: 0.5 },
      angry: { seed_genres: 'rock,metal', target_valence: 0.2, target_energy: 0.9 },
      surprised: { seed_genres: 'experimental,world', target_valence: 0.6, target_energy: 0.7 },
      disgusted: { seed_genres: 'industrial,noise', target_valence: 0.1, target_energy: 0.4 },
      fearful: { seed_genres: 'ambient,dark-ambient', target_valence: 0.1, target_energy: 0.2 }
    };

    const seedParams = moodSeeds[mood] || moodSeeds.neutral;
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        ...seedParams,
        limit: parseInt(limit)
      }
    });

    const tracks = response.data.tracks.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: Math.floor(track.duration_ms / 1000),
      previewUrl: track.preview_url,
      externalUrl: track.external_urls.spotify,
      image: track.album.images[0]?.url,
      mood: mood,
      source: 'spotify'
    }));

    res.json({
      tracks,
      mood,
      recommendations: true
    });
  } catch (error) {
    console.error('Spotify recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get recommendations',
      message: error.message
    });
  }
});

// Get featured playlists
router.get('/playlists/featured', async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });

    const playlists = response.data.playlists.items.map(playlist => ({
      id: playlist.id,
      name: playlist.name,
      description: playlist.description,
      image: playlist.images[0]?.url,
      tracks: playlist.tracks.total,
      externalUrl: playlist.external_urls.spotify
    }));

    res.json({
      playlists,
      total: response.data.playlists.total,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: response.data.playlists.next !== null
      }
    });
  } catch (error) {
    console.error('Spotify playlists error:', error);
    res.status(500).json({
      error: 'Failed to fetch playlists',
      message: error.message
    });
  }
});

// Get playlist tracks
router.get('/playlist/:id/tracks', async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    const token = await getSpotifyToken();

    const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });

    const tracks = response.data.items
      .filter(item => item.track && item.track.preview_url)
      .map(item => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        duration: Math.floor(item.track.duration_ms / 1000),
        previewUrl: item.track.preview_url,
        externalUrl: item.track.external_urls.spotify,
        image: item.track.album.images[0]?.url,
        source: 'spotify'
      }));

    res.json({
      tracks,
      total: response.data.total,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: response.data.next !== null
      }
    });
  } catch (error) {
    console.error('Spotify playlist tracks error:', error);
    res.status(500).json({
      error: 'Failed to fetch playlist tracks',
      message: error.message
    });
  }
});

module.exports = router;
