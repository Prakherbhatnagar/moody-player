# 🎵 Last.fm Callback URL Setup Guide

## ✅ **LAST.FM CALLBACK URL CONFIGURATION**

### **🎯 Your Last.fm Callback URL:**
```
https://moody-player-ai.vercel.app/api/lastfm/callback
```

### **📋 Step-by-Step Setup:**

**1. Go to Last.fm API Account Creation:**
- Visit: https://www.last.fm/api/account/create
- Log in with your Last.fm account

**2. Fill in Application Details:**
- **Application name:** `Moody Player`
- **Application description:** `AI-powered music application`
- **Application homepage:** `https://moody-player-ai.vercel.app`
- **Application callback URL:** `https://moody-player-ai.vercel.app/api/lastfm/callback`

**3. Get Your Credentials:**
- **API Key:** Copy your API key (32 characters)
- **Shared Secret:** Copy your shared secret (32 characters)

**4. Add to Vercel Environment Variables:**
```
LASTFM_API_KEY=your_api_key_here
LASTFM_SECRET=your_shared_secret_here
LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
```

## 🔧 **LAST.FM AUTHENTICATION FLOW**

### **Step 1: Initiate Authentication**
```bash
GET https://moody-player-ai.vercel.app/api/lastfm/auth
```

**Response:**
```json
{
  "message": "Redirect to Last.fm for authentication",
  "authUrl": "https://www.last.fm/api/auth/?api_key=YOUR_API_KEY&cb=https://moody-player-ai.vercel.app/api/lastfm/callback",
  "redirect": "https://www.last.fm/api/auth/?api_key=YOUR_API_KEY&cb=https://moody-player-ai.vercel.app/api/lastfm/callback"
}
```

### **Step 2: User Authentication**
1. User clicks the `authUrl` or `redirect` URL
2. User logs into Last.fm
3. User grants permission to your app
4. Last.fm redirects to your callback URL with a token

### **Step 3: Handle Callback**
```bash
GET https://moody-player-ai.vercel.app/api/lastfm/callback?token=USER_TOKEN
```

**Response:**
```json
{
  "message": "Last.fm authentication successful",
  "session": {
    "key": "user_session_key",
    "name": "username",
    "subscriber": false
  }
}
```

## 🎯 **LAST.FM API FEATURES**

### **Available Endpoints:**
- **Authentication:** `/api/lastfm/auth` and `/api/lastfm/callback`
- **Similar Tracks:** `/api/lastfm/similar/:mood`
- **Artist Recommendations:** `/api/lastfm/recommendations/:artist`
- **Top Tracks:** `/api/lastfm/toptracks/:tag`

### **Example Usage:**
```bash
# Get similar tracks for happy mood
curl "https://moody-player-ai.vercel.app/api/lastfm/similar/happy"

# Get recommendations for an artist
curl "https://moody-player-ai.vercel.app/api/lastfm/recommendations/Radiohead"

# Get top tracks for a tag
curl "https://moody-player-ai.vercel.app/api/lastfm/toptracks/rock"
```

## ⚠️ **IMPORTANT NOTES:**

1. **Callback URL must match exactly** in Last.fm settings
2. **HTTPS required** for production
3. **API signature required** for authenticated requests
4. **Rate limits apply** - be mindful of API usage

## 🧪 **TEST YOUR SETUP:**

### **Test Authentication:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/auth"
```

### **Test Similar Tracks:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/similar/happy"
```

### **Test Recommendations:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/recommendations/Radiohead"
```

## 🎉 **SUCCESS INDICATORS:**

- ✅ Last.fm app created with correct callback URL
- ✅ API key and secret obtained
- ✅ Environment variables added to Vercel
- ✅ Authentication flow working
- ✅ API endpoints responding correctly

**Your Last.fm callback URL:**
`https://moody-player-ai.vercel.app/api/lastfm/callback`
