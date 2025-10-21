# 🔑 Environment Variables Setup Guide

## 📋 Required Environment Variables for Moody Player

Here are all the environment variables you need to set up for your Moody Player deployment:

### 🌐 **Core Application Variables**
```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-app-name.vercel.app
```

### 🗄️ **Database Configuration**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moody-player
```

### 🔐 **Security Configuration**
```env
JWT_SECRET=your-super-secure-jwt-secret-key-here
```

### 📁 **File Storage (ImageKit)**
```env
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 🎵 **Music APIs**
```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
LASTFM_API_KEY=your_lastfm_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

---

## 🚀 **Step-by-Step Setup Guide**

### 1. **MongoDB Atlas Setup** (Database)

#### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with your email

#### Step 2: Create Cluster
1. Choose "Shared" (Free tier)
2. Select AWS as provider
3. Choose a region close to you
4. Click "Create Cluster"

#### Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `moody-player-user`
4. Password: Generate a secure password
5. Database User Privileges: "Read and write to any database"
6. Click "Add User"

#### Step 4: Get Connection String
1. Go to "Clusters" → "Connect"
2. Choose "Connect your application"
3. Driver: Node.js
4. Version: 4.1 or later
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `moody-player`

**Your MONGODB_URI will look like:**
```
mongodb+srv://moody-player-user:yourpassword@cluster0.xxxxx.mongodb.net/moody-player?retryWrites=true&w=majority
```

### 2. **ImageKit Setup** (File Storage)

#### Step 1: Create ImageKit Account
1. Go to: https://imagekit.io
2. Click "Start Free Trial"
3. Sign up with your email

#### Step 2: Get API Keys
1. Go to "Developer Options" in dashboard
2. Copy your:
   - **Public Key** (IMAGEKIT_PUBLIC_KEY)
   - **Private Key** (IMAGEKIT_PRIVATE_KEY)
   - **URL Endpoint** (IMAGEKIT_URL_ENDPOINT)

**Example values:**
```env
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### 3. **Spotify API Setup** (Music Recommendations)

#### Step 1: Create Spotify Developer Account
1. Go to: https://developer.spotify.com
2. Click "Log in" and use your Spotify account
3. If you don't have Spotify, create a free account first

#### Step 2: Create App
1. Go to "Dashboard"
2. Click "Create App"
3. App Name: `Moody Player`
4. App Description: `AI-powered music application with mood detection`
5. Website: `https://your-app-name.vercel.app`
6. Redirect URI: `https://your-app-name.vercel.app/api/spotify/callback`
7. Click "Save"

#### Step 3: Get API Keys
1. Click on your app
2. Go to "Settings"
3. Copy:
   - **Client ID** (SPOTIFY_CLIENT_ID)
   - **Client Secret** (SPOTIFY_CLIENT_SECRET)

**Example values:**
```env
SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
SPOTIFY_CLIENT_SECRET=abcdef1234567890abcdef1234567890
```

### 4. **Last.fm API Setup** (Alternative Music Source)

#### Step 1: Create Last.fm Account
1. Go to: https://www.last.fm/api
2. Click "Get an API account"
3. Sign up for a free account

#### Step 2: Get API Key
1. Go to "API Account"
2. Copy your **API Key**

**Example value:**
```env
LASTFM_API_KEY=your_lastfm_api_key_here
```

### 5. **YouTube API Setup** (Optional - for Music Videos)

#### Step 1: Create Google Cloud Project
1. Go to: https://console.developers.google.com
2. Click "Create Project"
3. Name: `Moody Player`
4. Click "Create"

#### Step 2: Enable YouTube API
1. Go to "APIs & Services" → "Library"
2. Search for "YouTube Data API v3"
3. Click "Enable"

#### Step 3: Create API Key
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy the API key

**Example value:**
```env
YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

---

## 🔐 **Generate Secure JWT Secret**

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Or use this online generator: https://generate-secret.vercel.app/64

**Example JWT_SECRET:**
```env
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2
```

---

## 📝 **Complete Environment Variables Template**

Copy this template and fill in your actual values:

```env
# Core Application
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-app-name.vercel.app

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moody-player

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here

# File Storage (ImageKit)
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

## 🚀 **How to Add Environment Variables in Vercel**

### Method 1: Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add each variable one by one
5. Make sure to select "Production" environment
6. Click "Save"

### Method 2: Vercel CLI
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add IMAGEKIT_PUBLIC_KEY
# ... add all other variables
```

---

## ✅ **Verification Checklist**

Before deploying, make sure you have:

- [ ] MongoDB Atlas cluster created and accessible
- [ ] ImageKit account with API keys
- [ ] Spotify Developer app with client ID and secret
- [ ] Last.fm API key (optional)
- [ ] YouTube API key (optional)
- [ ] Secure JWT secret generated
- [ ] All environment variables added to Vercel

---

## 🆘 **Need Help?**

If you need help with any of these services:

1. **MongoDB Atlas**: https://docs.atlas.mongodb.com/
2. **ImageKit**: https://docs.imagekit.io/
3. **Spotify API**: https://developer.spotify.com/documentation/
4. **Last.fm API**: https://www.last.fm/api
5. **YouTube API**: https://developers.google.com/youtube/v3

---

**🎵 Happy Deploying! Your Moody Player will be live soon!**
