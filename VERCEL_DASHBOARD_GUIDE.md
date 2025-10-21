# 🎯 Vercel Dashboard - YouTube API Setup Guide

## 📋 **STEP-BY-STEP VERCEL DASHBOARD NAVIGATION**

### **Step 1: Access Your Vercel Project**
1. Go to: https://vercel.com/dashboard
2. Find your **"moody-player-ai"** project
3. Click on the project name

### **Step 2: Navigate to Environment Variables**
1. Click the **"Settings"** tab (next to "Deployments")
2. In the left sidebar, click **"Environment Variables"**
3. You'll see a list of your current environment variables

### **Step 3: Add YouTube API Key**
1. Click the **"+ Add New"** button
2. Fill in the form:
   - **Name:** `YOUTUBE_API_KEY`
   - **Value:** `your_actual_youtube_api_key_here`
   - **Environment:** Select **"Production"** (and "Preview" if you want)
3. Click **"Save"**

### **Step 4: Verify All Environment Variables**

You should see ALL these variables in your Vercel environment:

```
✅ NODE_ENV=production
✅ PORT=3000
✅ FRONTEND_URL=https://moody-player-ai.vercel.app
✅ MONGODB_URI=mongodb+srv://prakherbhatnagar63:Rb5S8hESviKVyWFh@cluster0.f6cxzao.mongodb.net/moody-player?retryWrites=true&w=majority&appName=Cluster
✅ JWT_SECRET=10300ca20c32ec8e40f34011b1c18e8f6caf424597ddebe0d611a6f3929d0bebb34b6e0719b4d5b8c5c4a44831fd765345efe497685f9653f7418595fa62753e
✅ IMAGEKIT_PUBLIC_KEY=public_IByvanso8VAvrZgdPICVayzym3I=
✅ IMAGEKIT_PRIVATE_KEY=private_/ga2zvzmWt/gG2jEOvv6GKZBlL0=
✅ IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/iw4tuqak2
✅ SPOTIFY_CLIENT_ID=e66da6e76eed416996d7d4831626a590
✅ SPOTIFY_CLIENT_SECRET=952b38de891544c9a1a2db489a5e40e0
✅ SPOTIFY_REDIRECT_URI=https://moody-player-ai.vercel.app/api/spotify/callback
✅ LASTFM_API_KEY=9296f8ba49f1ee44721bc9e7fa89769c
✅ LASTFM_SECRET=7415c251e056e10cecb6952da134e7f7
✅ LASTFM_CALLBACK_URL=https://moody-player-ai.vercel.app/api/lastfm/callback
✅ YOUTUBE_API_KEY=your_youtube_api_key_here
```

### **Step 5: Redeploy Your Project**

**Option 1: Automatic Redeploy**
- Go to **"Deployments"** tab
- Click **"Redeploy"** on your latest deployment
- Wait for deployment to complete

**Option 2: Push to GitHub**
- Make a small change to any file
- Push to GitHub
- Vercel will automatically redeploy

### **Step 6: Test Your YouTube API**

**Test in Browser:**
- Go to: `https://moody-player-ai.vercel.app/api/youtube/search/happy`
- You should see JSON response with music videos

**Test with curl:**
```bash
curl "https://moody-player-ai.vercel.app/api/youtube/search/happy"
```

## 🎬 **YOUTUBE API ENDPOINTS TO TEST:**

### **1. Search by Mood:**
```
https://moody-player-ai.vercel.app/api/youtube/search/happy
https://moody-player-ai.vercel.app/api/youtube/search/sad
https://moody-player-ai.vercel.app/api/youtube/search/calm
```

### **2. Find Video for Track:**
```
https://moody-player-ai.vercel.app/api/youtube/video/Bohemian%20Rhapsody/Queen
https://moody-player-ai.vercel.app/api/youtube/video/Imagine/John%20Lennon
```

### **3. Get Trending Videos:**
```
https://moody-player-ai.vercel.app/api/youtube/trending
```

## 🎯 **VERCEL DASHBOARD LOCATIONS:**

### **Environment Variables:**
- **Path:** Project → Settings → Environment Variables
- **URL:** `https://vercel.com/[username]/[project]/settings/environment-variables`

### **Deployments:**
- **Path:** Project → Deployments
- **URL:** `https://vercel.com/[username]/[project]/deployments`

### **Function Logs:**
- **Path:** Project → Functions → [Function Name] → Logs
- **URL:** `https://vercel.com/[username]/[project]/functions`

## ⚠️ **TROUBLESHOOTING:**

### **If YouTube API doesn't work:**
1. **Check Vercel logs** in the Functions section
2. **Verify API key** is correct in Environment Variables
3. **Test locally** with your API key
4. **Check Google Cloud Console** for API quotas

### **Common Vercel Issues:**
- **"Environment variable not found"** → Check spelling and case
- **"Function timeout"** → Check API response times
- **"Build failed"** → Check for syntax errors in code

## 🎉 **SUCCESS CHECKLIST:**

- [ ] YouTube API key added to Vercel
- [ ] All environment variables present
- [ ] Project redeployed successfully
- [ ] YouTube endpoints responding
- [ ] Music videos being returned
- [ ] No errors in Vercel logs

**Follow this guide to successfully add YouTube API to your Vercel project!**
