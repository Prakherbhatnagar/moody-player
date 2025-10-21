# 🎬 YouTube API in Vercel - Step by Step

## 🚀 **HOW TO SET YOUTUBE API IN VERCEL ENVIRONMENT**

### **Step 1: Get Your YouTube API Key**

**1. Go to Google Cloud Console:**
- Visit: https://console.developers.google.com/
- Sign in with your Google account

**2. Create or Select Project:**
- Create a new project or select existing
- Name it "Moody Player" or similar

**3. Enable YouTube Data API v3:**
- Go to **"APIs & Services"** → **"Library"**
- Search for **"YouTube Data API v3"**
- Click **"Enable"**

**4. Create API Key:**
- Go to **"APIs & Services"** → **"Credentials"**
- Click **"+ CREATE CREDENTIALS"**
- Select **"API Key"**
- Copy your API key (looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### **Step 2: Add to Vercel Environment Variables**

**1. Go to Your Vercel Project:**
- Visit: https://vercel.com/dashboard
- Click on your **"moody-player-ai"** project

**2. Go to Settings:**
- Click **"Settings"** tab
- Click **"Environment Variables"** in the sidebar

**3. Add YouTube API Key:**
- Click **"Add New"**
- **Name:** `YOUTUBE_API_KEY`
- **Value:** `your_actual_youtube_api_key_here`
- **Environment:** Select **"Production"** (and Preview if you want)
- Click **"Save"**

### **Step 3: Verify Your Complete Environment Variables**

Your Vercel environment should have ALL these variables:

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

### **Step 4: Redeploy Your Project**

**1. Trigger Redeploy:**
- Go to **"Deployments"** tab in Vercel
- Click **"Redeploy"** on your latest deployment
- Or push a new commit to GitHub

**2. Wait for Deployment:**
- Wait for the deployment to complete
- Check the deployment logs for any errors

### **Step 5: Test Your YouTube API**

**Test YouTube Search:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"
```

**Test Video Search:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/video/Bohemian%20Rhapsody/Queen"
```

**Test Trending:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/trending"
```

## 🎯 **YOUTUBE API FEATURES AVAILABLE:**

### **Available Endpoints:**
- **`/api/youtube/search/:mood`** - Search music videos by mood
- **`/api/youtube/video/:track/:artist`** - Find video for specific track
- **`/api/youtube/trending`** - Get trending music videos

### **Example Responses:**

**Search by Mood:**
```json
{
  "mood": "happy",
  "searchTerm": "happy upbeat music",
  "videos": [
    {
      "id": "video_id",
      "title": "Happy Music Video",
      "description": "Description...",
      "thumbnail": "thumbnail_url",
      "channelTitle": "Channel Name",
      "url": "https://www.youtube.com/watch?v=video_id"
    }
  ]
}
```

## ⚠️ **IMPORTANT NOTES:**

1. **YouTube API Quotas:** Free tier includes 10,000 units per day
2. **Search requests:** Cost 100 units each
3. **Video details:** Cost 1 unit each
4. **Rate limiting:** Consider implementing for production

## 🧪 **TROUBLESHOOTING:**

### **If YouTube API doesn't work:**
1. **Check API key** is correct in Vercel
2. **Verify YouTube Data API v3** is enabled
3. **Check API quotas** in Google Cloud Console
4. **Test locally** with your API key

### **Common Issues:**
- **"API key not valid"** → Check if API key is correct
- **"Quota exceeded"** → Wait for quota reset or upgrade plan
- **"API not enabled"** → Enable YouTube Data API v3

## 🎉 **SUCCESS INDICATORS:**

- ✅ YouTube API key added to Vercel
- ✅ Project redeployed successfully
- ✅ YouTube endpoints responding
- ✅ Music videos being returned
- ✅ No API errors in logs

**Follow these steps to add YouTube API to your Vercel environment!**
