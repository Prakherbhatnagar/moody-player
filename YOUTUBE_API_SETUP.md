# 🎬 YouTube API Setup Guide

## 🎯 **GET YOUR YOUTUBE API KEY**

### **Step 1: Go to Google Cloud Console**
1. Visit: https://console.developers.google.com/
2. Sign in with your Google account
3. Create a new project or select existing project

### **Step 2: Enable YouTube Data API v3**
1. In the Google Cloud Console, go to **"APIs & Services"**
2. Click **"Enable APIs and Services"**
3. Search for **"YouTube Data API v3"**
4. Click **"Enable"**

### **Step 3: Create API Key**
1. Go to **"Credentials"** in the sidebar
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"API Key"**
4. Copy your **API Key** (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### **Step 4: Configure API Key (Optional but Recommended)**
1. Click on your API key to edit it
2. **Application restrictions:** Choose "HTTP referrers"
3. **Website restrictions:** Add `https://moody-player-ai.vercel.app/*`
4. **API restrictions:** Select "YouTube Data API v3"
5. Click **"Save"**

## 📝 **ADD TO VERCEL ENVIRONMENT VARIABLES**

Once you get your YouTube API key, add it to Vercel:

```
YOUTUBE_API_KEY=your_actual_youtube_api_key_here
```

## 🎯 **YOUTUBE API FEATURES**

### **Available Endpoints:**
- **Search Videos:** `/api/youtube/search/:mood` - Search music videos by mood
- **Find Video:** `/api/youtube/video/:track/:artist` - Find video for specific track
- **Trending:** `/api/youtube/trending` - Get trending music videos

### **Example Usage:**
```bash
# Search music videos for happy mood
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"

# Find video for specific track
curl "https://moody-player-ai.vercel.app/api/youtube/video/Bohemian%20Rhapsody/Queen"

# Get trending music videos
curl "https://moody-player-ai.vercel.app/api/youtube/trending"
```

## 🚀 **COMPLETE VERCEL ENVIRONMENT VARIABLES**

After getting your YouTube API key, your complete environment variables will be:

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

## ⚠️ **IMPORTANT NOTES:**

1. **YouTube API has quotas** - free tier includes 10,000 units per day
2. **Search requests cost 100 units each**
3. **Video details requests cost 1 unit each**
4. **Consider rate limiting** for production use

## 🧪 **TEST YOUR YOUTUBE API:**

### **Test Search:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"
```

### **Test Video Search:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/video/Bohemian%20Rhapsody/Queen"
```

### **Test Trending:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/trending"
```

## 🎉 **ENHANCED FEATURES WITH YOUTUBE:**

- 🎥 **Music video search** by mood
- 🎵 **Track-specific video discovery**
- 📺 **Trending music videos**
- 🔍 **Enhanced music discovery**
- 📊 **Video statistics and metadata**

**Get your YouTube API key and add it to Vercel for complete music video integration!**
