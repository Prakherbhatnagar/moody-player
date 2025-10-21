# 🎬 YouTube API - Quick Setup

## 🚀 **QUICK STEPS TO GET YOUTUBE API KEY:**

### **1. Go to Google Cloud Console:**
- Visit: https://console.developers.google.com/
- Sign in with Google account

### **2. Enable YouTube Data API v3:**
- Go to "APIs & Services" → "Enable APIs and Services"
- Search for "YouTube Data API v3"
- Click "Enable"

### **3. Create API Key:**
- Go to "Credentials" → "+ CREATE CREDENTIALS"
- Select "API Key"
- Copy your API key

### **4. Add to Vercel:**
```
YOUTUBE_API_KEY=your_api_key_here
```

## 🎯 **YOUR COMPLETE ENVIRONMENT VARIABLES:**

```
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://moody-player-ai.vercel.app
MONGODB_URI=mongodb+srv://prakherbhatnagar63:Rb5S8hESviKVyWFh@cluster0.f6cxzao.mongodb.net/moody-player?retryWrites=true&w=majority&appName=Cluster
JWT_SECRET=10300ca20c32ec8e40f34011b1c18e8f6caf424597ddebe0d611a6f3929d0bebb34b6e0719b4d5b8c5c4a44831fd765345efe497685f9653f7418595fa62753e
IMAGEKIT_PUBLIC_KEY=public_IByvanso8VAvrZgdPICVayzym3I=
IMAGEKIT_PRIVATE_KEY=private_/ga2zvzmWt/gG2jEOvv6GKZBlL0=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/iw4tuqak2
SPOTIFY_CLIENT_ID=e66da6e76eed416996d7d4831626a590
SPOTIFY_CLIENT_SECRET=952b38de891544c9a1a2db489a5e40e0
SPOTIFY_REDIRECT_URI=https://moody-player-ai.vercel.app/api/spotify/callback
LASTFM_API_KEY=9296f8ba49f1ee44721bc9e7fa89769c
LASTFM_SECRET=7415c251e056e10cecb6952da134e7f7
LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
YOUTUBE_API_KEY=your_youtube_api_key_here
```

## 🧪 **TEST ENDPOINTS:**

```bash
# Search music videos by mood
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"

# Find video for specific track
curl "https://moody-player-ai.vercel.app/api/youtube/video/Bohemian%20Rhapsody/Queen"

# Get trending music videos
curl "https://moody-player-ai.vercel.app/api/youtube/trending"
```

## 🎉 **FEATURES WITH YOUTUBE API:**

- 🎥 Music video search and discovery
- 🎵 Track-specific video recommendations
- 📺 Trending music videos
- 🔍 Enhanced music discovery
- 📊 Video statistics and metadata

**Get your YouTube API key and complete your music application!**
