# 🔑 Complete API Keys Setup Guide

## 🚀 **Quick Start - Get All API Keys**

### **Step 1: MongoDB Atlas (Database) - REQUIRED**

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Sign up** for free account
3. **Create cluster** (choose "Shared" free tier)
4. **Create database user**:
   - Username: `moody-player-user`
   - Password: Create a secure password
5. **Get connection string**:
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `moody-player`

**Your MONGODB_URI will look like:**
```
mongodb+srv://moody-player-user:yourpassword@cluster0.xxxxx.mongodb.net/moody-player?retryWrites=true&w=majority
```

### **Step 2: ImageKit (File Storage) - REQUIRED**

1. **Go to**: https://imagekit.io
2. **Sign up** for free account
3. **Go to "Developer Options"** in dashboard
4. **Copy these values**:
   - Public Key
   - Private Key  
   - URL Endpoint

**Example:**
```
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### **Step 3: Spotify API (Music) - REQUIRED**

1. **Go to**: https://developer.spotify.com
2. **Log in** with Spotify account (create free account if needed)
3. **Create app**:
   - App Name: `Moody Player`
   - Description: `AI-powered music application`
   - Website: `https://your-app-name.vercel.app`
   - Redirect URI: `https://your-app-name.vercel.app/api/spotify/callback`
4. **Get credentials**:
   - Go to "Settings"
   - Copy Client ID and Client Secret

**Example:**
```
SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
SPOTIFY_CLIENT_SECRET=abcdef1234567890abcdef1234567890
```

### **Step 4: Last.fm API (Optional)**

1. **Go to**: https://www.last.fm/api
2. **Sign up** for free account
3. **Get API key** from "API Account" section

**Example:**
```
LASTFM_API_KEY=your_lastfm_api_key_here
```

### **Step 5: YouTube API (Optional)**

1. **Go to**: https://console.developers.google.com
2. **Create project** named "Moody Player"
3. **Enable YouTube Data API v3**
4. **Create API key** in "Credentials" section

**Example:**
```
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 📝 **Your Complete Environment Variables**

Once you have all the API keys, your `.env` file should look like this:

```env
# Core Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-app-name.vercel.app

# Database
MONGODB_URI=mongodb+srv://moody-player-user:yourpassword@cluster0.xxxxx.mongodb.net/moody-player?retryWrites=true&w=majority

# Security
JWT_SECRET=10300ca20c32ec8e40f34011b1c18e8f6caf424597ddebe0d611a6f3929d0bebb34b6e0719b4d5b8c5c4a44831fd765345efe497685f9653f7418595fa62753e

# File Storage
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Music APIs
SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
SPOTIFY_CLIENT_SECRET=abcdef1234567890abcdef1234567890
LASTFM_API_KEY=your_lastfm_api_key_here
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🚀 **Add to Vercel Deployment**

### **Method 1: Vercel Dashboard**
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add each variable one by one
4. Select "Production" environment
5. Click "Save"

### **Method 2: Vercel CLI**
```bash
vercel env add MONGODB_URI
vercel env add IMAGEKIT_PUBLIC_KEY
vercel env add IMAGEKIT_PRIVATE_KEY
vercel env add IMAGEKIT_URL_ENDPOINT
vercel env add SPOTIFY_CLIENT_ID
vercel env add SPOTIFY_CLIENT_SECRET
vercel env add LASTFM_API_KEY
vercel env add YOUTUBE_API_KEY
```

---

## ✅ **Priority Order**

**Required for basic functionality:**
1. ✅ MongoDB Atlas (Database)
2. ✅ ImageKit (File Storage)
3. ✅ Spotify API (Music)

**Optional for enhanced features:**
4. 🔄 Last.fm API (Alternative music source)
5. 🔄 YouTube API (Music videos)

---

## 🆘 **Need Help?**

- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **ImageKit**: https://docs.imagekit.io/
- **Spotify API**: https://developer.spotify.com/documentation/
- **Last.fm API**: https://www.last.fm/api
- **YouTube API**: https://developers.google.com/youtube/v3

---

**🎵 Once you have all the API keys, your Moody Player will be ready to deploy!**
