# 🔑 Get Your Last.fm Shared Secret

## ✅ **YOUR LAST.FM API KEY:**
```
9e396dcb87a36624dcd727f2a721dd2f
```

## 🔐 **GET YOUR LAST.FM SHARED SECRET:**

### **Step 1: Go to Your Last.fm App Settings**
1. Visit: https://www.last.fm/api/account/create
2. Log in with your Last.fm account
3. You should see your "Moody Player" app

### **Step 2: Find Your Shared Secret**
1. Click on your **"Moody Player"** app
2. Look for **"Shared Secret"** or **"API Secret"**
3. Copy the 32-character secret (looks like: `abcdef1234567890abcdef1234567890`)

### **Step 3: Update Your App Settings**
Make sure your app has these settings:
- **Application name:** `Moody Player`
- **Application description:** `AI-powered music application`
- **Application homepage:** `https://moody-player-ai.vercel.app`
- **Application callback URL:** `https://moody-player-ai.vercel.app/api/lastfm/callback`

## 📝 **COMPLETE VERCEL ENVIRONMENT VARIABLES:**

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
LASTFM_API_KEY=9e396dcb87a36624dcd727f2a721dd2f
LASTFM_SECRET=your_lastfm_shared_secret_here
LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
YOUTUBE_API_KEY=your_youtube_api_key
```

## 🧪 **TEST YOUR LAST.FM API:**

### **Test Similar Tracks:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/similar/happy"
```

### **Test Recommendations:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/recommendations/Radiohead"
```

### **Test Top Tracks:**
```bash
curl "https://moody-player-ai.vercel.app/api/lastfm/toptracks/rock"
```

## 🎯 **NEXT STEPS:**

1. **Get your Last.fm shared secret** from your app settings
2. **Add it to Vercel** as `LASTFM_SECRET`
3. **Test the API endpoints** to make sure everything works
4. **Deploy to Vercel** with all environment variables

## ⚠️ **IMPORTANT NOTES:**

- **Shared Secret is required** for authenticated Last.fm requests
- **Keep your secret secure** - don't share it publicly
- **Callback URL must match exactly** in your Last.fm app settings
- **API key is public** but secret is private

**Once you get your shared secret, your Last.fm integration will be complete!**
