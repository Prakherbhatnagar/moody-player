# 🚀 Quick API Setup Guide

## 📋 **Get Your API Keys in 5 Minutes**

### **1. 🗄️ MongoDB Atlas (Database) - 2 minutes**

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Click**: "Try Free" → Sign up
3. **Create cluster**: Choose "Shared" (Free)
4. **Create user**: 
   - Username: `moody-player-user`
   - Password: Create secure password
5. **Get connection string**:
   - Clusters → Connect → "Connect your application"
   - Copy the string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `moody-player`

**Result**: `mongodb+srv://moody-player-user:yourpassword@cluster0.xxxxx.mongodb.net/moody-player`

### **2. 📁 ImageKit (File Storage) - 2 minutes**

1. **Go to**: https://imagekit.io
2. **Sign up** for free account
3. **Go to**: Dashboard → "Developer Options"
4. **Copy**:
   - Public Key
   - Private Key
   - URL Endpoint

**Result**: 
```
IMAGEKIT_PUBLIC_KEY=public_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_PRIVATE_KEY=private_xxxxxxxxxxxxxxxxxxxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

### **3. 🎵 Spotify API (Music) - 1 minute**

1. **Go to**: https://developer.spotify.com
2. **Log in** with Spotify account
3. **Create app**:
   - App Name: `Moody Player`
   - Redirect URI: `https://moody-player-ai.vercel.app/api/spotify/callback`
4. **Get credentials**:
   - Go to Settings
   - Copy Client ID and Client Secret

**Result**:
```
SPOTIFY_CLIENT_ID=1234567890abcdef1234567890abcdef
SPOTIFY_CLIENT_SECRET=abcdef1234567890abcdef1234567890
```

---

## 🔧 **Run the Setup Script**

```bash
node setup-apis.js
```

This will:
- ✅ Ask you for each API key
- ✅ Save them to `.env` file
- ✅ Create production environment file
- ✅ Give you Vercel deployment instructions

---

## 🚀 **Deploy to Vercel**

1. **Go to**: https://vercel.com/new
2. **Import**: Your GitHub repository
3. **Add environment variables** from the script output
4. **Deploy**!

---

## ⚡ **Quick Start Commands**

```bash
# Run the API setup
node setup-apis.js

# Test locally
npm run dev

# Deploy to Vercel
npx vercel --prod
```

---

**🎵 Your Moody Player will be live in minutes!**
