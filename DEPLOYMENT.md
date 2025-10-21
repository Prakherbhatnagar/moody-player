# 🚀 Moody Player Deployment Guide

This guide covers deploying Moody Player to various platforms and cloud services.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB (local or Atlas)
- Git repository access
- API keys for external services

## 🔧 Environment Setup

### Required Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://your-domain.com

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moody-player

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-here

# ImageKit Configuration
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Optional APIs
LASTFM_API_KEY=your_lastfm_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

## 🌐 Platform Deployments

### 1. Heroku Deployment

#### Step 1: Prepare for Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-moody-player-app
```

#### Step 2: Configure Environment Variables
```bash
# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set IMAGEKIT_PUBLIC_KEY=your_imagekit_key
heroku config:set IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
heroku config:set IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
heroku config:set SPOTIFY_CLIENT_ID=your_spotify_client_id
heroku config:set SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

#### Step 3: Deploy
```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/your-moody-player-app.git

# Deploy
git push heroku main

# Open app
heroku open
```

#### Step 4: Add MongoDB Atlas
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and database
3. Get connection string
4. Set `MONGODB_URI` environment variable

### 2. Vercel Deployment

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Configure Project
```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add IMAGEKIT_PUBLIC_KEY
# ... add all other environment variables
```

#### Step 3: Deploy
```bash
# Deploy to production
vercel --prod
```

### 3. Railway Deployment

#### Step 1: Connect Repository
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Railway will auto-detect Node.js

#### Step 2: Configure Environment
```bash
# Set environment variables in Railway dashboard
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=your_key
# ... etc
```

#### Step 3: Deploy
Railway will automatically deploy on git push to main branch.

### 4. DigitalOcean App Platform

#### Step 1: Create App
1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Create new app from GitHub repository
3. Select Node.js as runtime

#### Step 2: Configure Environment
Add all environment variables in the app settings.

#### Step 3: Deploy
DigitalOcean will automatically build and deploy your app.

### 5. AWS Deployment

#### Using AWS Elastic Beanstalk

#### Step 1: Install EB CLI
```bash
pip install awsebcli
```

#### Step 2: Initialize EB
```bash
eb init
eb create production
```

#### Step 3: Configure Environment
```bash
eb setenv MONGODB_URI=your_mongodb_uri
eb setenv JWT_SECRET=your_jwt_secret
# ... set all environment variables
```

#### Step 4: Deploy
```bash
eb deploy
```

### 6. Docker Deployment

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node health-check.js

# Start application
CMD ["npm", "start"]
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3.8'

services:
  moody-player:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/moody-player
      - JWT_SECRET=your_jwt_secret
      - IMAGEKIT_PUBLIC_KEY=your_imagekit_key
      - IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
      - IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
      - SPOTIFY_CLIENT_ID=your_spotify_client_id
      - SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

#### Step 3: Deploy with Docker
```bash
# Build and run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

## 🔐 Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use strong, unique secrets for JWT_SECRET
- Rotate API keys regularly
- Use different keys for development/production

### 2. Database Security
- Use MongoDB Atlas with IP whitelisting
- Enable authentication
- Use SSL/TLS connections
- Regular backups

### 3. API Security
- Rate limiting is already implemented
- CORS is configured
- Helmet security headers
- Input validation and sanitization

### 4. File Upload Security
- File type validation
- Size limits (50MB)
- Virus scanning (consider adding)
- Secure file storage with ImageKit

## 📊 Monitoring and Logging

### 1. Health Checks
```bash
# Check application health
curl https://your-domain.com/api/health

# Expected response
{
  "status": "OK",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "uptime": 3600
}
```

### 2. Logging
- Application logs are written to console
- Consider adding Winston for structured logging
- Set up log aggregation (e.g., LogDNA, Papertrail)

### 3. Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor API response times
- Set up alerts for errors
- Monitor database performance

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-moody-player-app"
        heroku_email: "your-email@example.com"
```

## 🚨 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Issues
```bash
# Check MongoDB connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/moody-player"

# Test connection in app
curl https://your-domain.com/api/health
```

#### 2. FaceAPI Models Not Loading
- Ensure models are in `public/models/` directory
- Check file permissions
- Verify model files are complete

#### 3. Spotify API Issues
- Verify client ID and secret
- Check API quotas
- Ensure redirect URIs are configured

#### 4. File Upload Issues
- Check ImageKit configuration
- Verify file size limits
- Test with different file types

### Debug Commands
```bash
# Check application logs
heroku logs --tail

# Check environment variables
heroku config

# Test database connection
heroku run node -e "console.log(process.env.MONGODB_URI)"

# Check file uploads
heroku run ls -la uploads/
```

## 📈 Performance Optimization

### 1. Database Optimization
- Add indexes for frequently queried fields
- Use connection pooling
- Implement caching (Redis)

### 2. File Storage
- Use CDN for static assets
- Implement image optimization
- Consider video transcoding

### 3. API Optimization
- Implement response caching
- Use compression (gzip)
- Optimize database queries
- Add pagination

## 🔄 Backup and Recovery

### 1. Database Backups
```bash
# MongoDB Atlas provides automatic backups
# For local MongoDB:
mongodump --uri="mongodb://localhost:27017/moody-player" --out=backup/
```

### 2. File Backups
- ImageKit provides automatic backups
- Consider additional cloud storage
- Implement versioning

### 3. Application Backups
- Use Git for code versioning
- Store environment variables securely
- Document deployment procedures

## 📞 Support

- **Documentation**: Check this README and code comments
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub discussions for questions
- **Community**: Join our Discord server

---

**Happy Deploying! 🚀**

*For more help, check the main README.md or create an issue on GitHub.*
