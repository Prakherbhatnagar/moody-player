# 🔑 Get Last.fm & YouTube API Keys

## 🎵 **LAST.FM API KEY**

### **Step 1: Create Last.fm Account**
1. Go to: https://www.last.fm/join
2. Sign up for a free account
3. Verify your email

### **Step 2: Get API Key**
1. Go to: https://www.last.fm/api/account/create
2. Fill in the form:
   - **Application name:** `Moody Player`
   - **Application description:** `AI-powered music application`
   - **Application homepage:** `https://moody-player-ai.vercel.app`
   - **Application callback URL:** `https://moody-player-ai.vercel.app/api/lastfm/callback`
3. Click **"Create"**
4. Copy your **API Key** (looks like: `1234567890abcdef1234567890abcdef`)
5. Copy your **Shared Secret** (looks like: `abcdef1234567890abcdef1234567890`)

### **Step 3: Add to Vercel**
```
LASTFM_API_KEY=your_actual_api_key_here
LASTFM_SECRET=your_actual_secret_here
LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
```

## 🎬 **YOUTUBE API KEY**

### **Step 1: Create Google Account**
1. Go to: https://console.developers.google.com/
2. Sign in with your Google account
3. Create a new project or select existing

### **Step 2: Enable YouTube API**
1. In the Google Cloud Console, go to **"APIs & Services"**
2. Click **"Enable APIs and Services"**
3. Search for **"YouTube Data API v3"**
4. Click **"Enable"**

### **Step 3: Create API Key**
1. Go to **"Credentials"** in the sidebar
2. Click **"+ CREATE CREDENTIALS"**
3. Select **"API Key"**
4. Copy your **API Key** (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### **Step 4: Add to Vercel**
```
YOUTUBE_API_KEY=your_actual_api_key_here
```

## 🚀 **QUICK SETUP COMMANDS**

### **Get Last.fm API Key:**
```bash
# Visit: https://www.last.fm/api/account/create
# Fill form and get API key
# Add to Vercel: LASTFM_API_KEY=your_key_here
```

### **Get YouTube API Key:**
```bash
# Visit: https://console.developers.google.com/
# Enable YouTube Data API v3
# Create API key
# Add to Vercel: YOUTUBE_API_KEY=your_key_here
```

## 📝 **COMPLETE VERCEL ENVIRONMENT VARIABLES**

Add these to your Vercel project:

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
LASTFM_API_KEY=your_lastfm_api_key_here
LASTFM_SECRET=your_lastfm_secret_here
LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
YOUTUBE_API_KEY=your_youtube_api_key_here
```

## 🎯 **NEW API ENDPOINTS AVAILABLE**

### **Last.fm Endpoints:**
- `GET /api/lastfm/auth` - Get Last.fm authentication URL
- `GET /api/lastfm/callback` - Handle Last.fm authentication callback
- `GET /api/lastfm/similar/:mood` - Get similar tracks by mood
- `GET /api/lastfm/recommendations/:artist` - Get artist recommendations
- `GET /api/lastfm/toptracks/:tag` - Get top tracks by tag

### **YouTube Endpoints:**
- `GET /api/youtube/search/:mood` - Search music videos by mood
- `GET /api/youtube/video/:track/:artist` - Find video for specific track
- `GET /api/youtube/trending` - Get trending music videos

## ⚠️ **IMPORTANT NOTES:**

1. **Last.fm API** is free with rate limits
2. **YouTube API** has free tier with quotas
3. Both APIs require proper authentication
4. Consider rate limiting and error handling

## 🧪 **TEST YOUR API KEYS:**

### **Test Last.fm:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/similar/happy"
```

### **Test YouTube:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"
```

**Get your API keys and add them to Vercel for enhanced music features!**
