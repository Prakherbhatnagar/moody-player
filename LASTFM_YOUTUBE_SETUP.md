# 🎵 Last.fm & YouTube API Setup Guide

## 📊 **CURRENT STATUS:**
- ✅ **Spotify API** - Fully integrated and working
- ✅ **ImageKit** - Fully integrated and working  
- ✅ **MongoDB** - Fully integrated and working
- ⚠️ **Last.fm API** - Environment variables set, but not used in code yet
- ⚠️ **YouTube API** - Environment variables set, but not used in code yet

## 🎯 **LAST.FM API SETUP**

### **Step 1: Get Last.fm API Key**
1. Go to: https://www.last.fm/api/account/create
2. Fill in the form:
   - **Application name:** `Moody Player`
   - **Application description:** `AI-powered music application`
   - **Application homepage:** `https://moody-player-ai.vercel.app`
3. Click **"Create"**
4. Copy your **API Key**

### **Step 2: Last.fm API Features**
Last.fm can provide:
- 🎵 **Music recommendations** based on mood
- 📊 **Music statistics** and trends
- 🏷️ **Music tagging** and metadata
- 👥 **Similar artists** and tracks
- 📈 **Music charts** and popularity data

### **Step 3: Integration Example**
```javascript
// Example Last.fm integration
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;

// Get similar tracks
const getSimilarTracks = async (artist, track) => {
  const response = await axios.get(`http://ws.audioscrobbler.com/2.0/`, {
    params: {
      method: 'track.getsimilar',
      artist: artist,
      track: track,
      api_key: LASTFM_API_KEY,
      format: 'json'
    }
  });
  return response.data;
};
```

## 🎬 **YOUTUBE API SETUP**

### **Step 1: Get YouTube API Key**
1. Go to: https://console.developers.google.com/
2. Create a new project or select existing
3. Enable **YouTube Data API v3**
4. Create credentials (API Key)
5. Copy your **API Key**

### **Step 2: YouTube API Features**
YouTube can provide:
- 🎥 **Music videos** for tracks
- 🎵 **Audio content** and playlists
- 📺 **Video recommendations**
- 🔍 **Music video search**
- 📊 **Video statistics** and metadata

### **Step 3: Integration Example**
```javascript
// Example YouTube integration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Search for music videos
const searchMusicVideos = async (query) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: 'snippet',
      q: query,
      type: 'video',
      videoCategoryId: '10', // Music category
      key: YOUTUBE_API_KEY
    }
  });
  return response.data;
};
```

## 🔧 **IMPLEMENTATION PLAN**

### **Phase 1: Last.fm Integration**
Add to `routes/spotify.js` or create `routes/lastfm.js`:
- Music recommendations based on mood
- Similar artists and tracks
- Music statistics and trends

### **Phase 2: YouTube Integration**
Add to `routes/spotify.js` or create `routes/youtube.js`:
- Music video search
- Video recommendations
- Audio content discovery

### **Phase 3: Enhanced Features**
- Combine Spotify + Last.fm + YouTube for richer recommendations
- Music video playback
- Enhanced music discovery

## 🚀 **QUICK SETUP COMMANDS**

### **Get Last.fm API Key:**
1. Visit: https://www.last.fm/api/account/create
2. Fill form and get API key
3. Add to Vercel environment variables

### **Get YouTube API Key:**
1. Visit: https://console.developers.google.com/
2. Enable YouTube Data API v3
3. Create API key
4. Add to Vercel environment variables

## 📝 **ENVIRONMENT VARIABLES TO ADD:**

```
LASTFM_API_KEY=your_lastfm_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

## 🎯 **NEXT STEPS:**

1. **Get API keys** from both services
2. **Add to Vercel** environment variables
3. **Implement integration** in code
4. **Test functionality** with your app

## ⚠️ **IMPORTANT NOTES:**

- **Last.fm API** is free with rate limits
- **YouTube API** has free tier with quotas
- Both APIs require proper authentication
- Consider rate limiting and error handling

**Would you like me to help you get these API keys and implement the integration?**
