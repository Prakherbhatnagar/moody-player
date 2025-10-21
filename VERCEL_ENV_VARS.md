# 🔑 Vercel Environment Variables

## Complete Environment Variables for Vercel Deployment

Copy and paste these EXACTLY into your Vercel project settings:

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
LASTFM_API_KEY=your_lastfm_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

## 🎯 Important Notes:

1. **SPOTIFY_REDIRECT_URI** - This is crucial for Spotify authentication
2. **FRONTEND_URL** - Used for CORS and frontend communication
3. **MONGODB_URI** - Your database connection string
4. **JWT_SECRET** - For user authentication

## 🚀 Deployment Steps:

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add ALL the environment variables above
4. Deploy!

## ✅ Your App Will Be Available At:
- **Main App**: https://moody-player-ai.vercel.app/
- **API Health**: https://moody-player-ai.vercel.app/api/health
- **API Test**: https://moody-player-ai.vercel.app/api/test
