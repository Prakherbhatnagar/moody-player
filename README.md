# 🎵 Moody Player - AI-Powered Music Experience

**Moody Player** is a fullstack AI-powered music application that detects your mood using facial expressions and plays songs that match your emotional state. Built with **React**, **FaceAPI.js**, **Express.js**, **MongoDB**, and integrated with **Spotify API** for live music recommendations.

![Moody Player](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green)

---

## ✨ Features

### 🎭 **AI Mood Detection**
- Real-time facial expression analysis using FaceAPI.js
- Detects 7 different emotions: Happy, Sad, Neutral, Angry, Surprised, Disgusted, Fearful
- Live video feed with emotion overlay
- Instant mood-based song recommendations

### 🎶 **Music Integration**
- **Uploaded Songs**: Upload and manage your own music library
- **Spotify Integration**: Live recommendations from Spotify's vast catalog
- **Cloud Storage**: Secure audio file storage with ImageKit
- **Smart Playlists**: AI-generated playlists based on mood patterns

### 👤 **User Experience**
- **User Authentication**: Secure login/registration system
- **Personal Profiles**: Customizable user profiles with preferences
- **Mood Insights**: Detailed analytics of your emotional patterns
- **Mood History**: Track your emotional journey over time
- **Trends Analysis**: Visual charts showing mood patterns

### 🔧 **Technical Features**
- **RESTful API**: Comprehensive backend API with Express.js
- **Database**: MongoDB with Mongoose for data persistence
- **Security**: JWT authentication, rate limiting, input validation
- **Real-time**: Live mood detection and instant song recommendations
- **Responsive**: Beautiful, modern UI that works on all devices

---

## 🧠 Tech Stack

| Frontend | Backend | Database | External APIs |
|----------|---------|----------|---------------|
| React 18 | Node.js + Express | MongoDB | Spotify Web API |
| FaceAPI.js | Mongoose | ImageKit | Last.fm API |
| Tailwind CSS | JWT Authentication | Cloud Storage | YouTube API |
| Axios | Multer (File Upload) | User Sessions | Face Detection |
| Lucide Icons | Helmet (Security) | Mood Analytics | Music Streaming |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Prakherbhatnagar/moody-player.git
cd moody-player
```

### 2. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies (if using separate frontend)
cd frontend && npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 4. Configure Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/moody-player

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# ImageKit Configuration (for file storage)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id

# Spotify API (for music recommendations)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Last.fm API (alternative music source)
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_SECRET=your_lastfm_secret

# YouTube API (for music videos)
YOUTUBE_API_KEY=your_youtube_api_key
```

### 5. Start the Application
```bash
# Start backend server
npm run dev

# In another terminal, start frontend (if separate)
npm run client
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

---

## 📁 Project Structure

```
moody-player/
├── 📁 models/                 # Database models
│   ├── User.js               # User schema and methods
│   ├── Song.js               # Song schema and methods
│   └── Playlist.js           # Playlist schema and methods
├── 📁 routes/                # API routes
│   ├── auth.js               # Authentication routes
│   ├── songs.js              # Song management routes
│   ├── moods.js              # Mood analytics routes
│   └── spotify.js            # Spotify integration routes
├── 📁 middleware/            # Custom middleware
│   └── auth.js               # JWT authentication middleware
├── 📁 components/            # React components
│   ├── AuthModal.jsx         # Login/Register modal
│   ├── MoodDetector.jsx      # Face detection component
│   ├── SongList.jsx          # Song display component
│   ├── SongUpload.jsx        # File upload component
│   ├── UserProfile.jsx       # User profile management
│   └── MoodInsights.jsx      # Mood analytics dashboard
├── 📁 public/                # Static assets
│   └── 📁 models/            # FaceAPI.js models
├── server.js                 # Express server setup
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

---

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `DELETE /api/auth/account` - Delete account

### Songs
- `GET /api/songs` - Get songs by mood/genre
- `GET /api/songs/search` - Search songs
- `GET /api/songs/popular/:mood` - Get popular songs by mood
- `POST /api/songs/upload` - Upload new song
- `GET /api/songs/:id` - Get single song
- `POST /api/songs/:id/play` - Increment play count
- `POST /api/songs/:id/like` - Like song
- `PUT /api/songs/:id` - Update song
- `DELETE /api/songs/:id` - Delete song

### Mood Analytics
- `GET /api/moods/stats` - Get mood statistics
- `GET /api/moods/history` - Get user mood history
- `POST /api/moods/detect` - Record mood detection
- `GET /api/moods/trends` - Get mood trends
- `GET /api/moods/recommendations/:mood` - Get mood recommendations
- `GET /api/moods/insights` - Get personalized insights

### Spotify Integration
- `GET /api/spotify/search/:mood` - Search Spotify by mood
- `GET /api/spotify/track/:id` - Get track details
- `GET /api/spotify/recommendations/:mood` - Get recommendations
- `GET /api/spotify/playlists/featured` - Get featured playlists
- `GET /api/spotify/playlist/:id/tracks` - Get playlist tracks

---

## 🎯 How It Works

### 1. **Mood Detection Process**
```
User clicks "Start Detection" → Camera activates → FaceAPI analyzes expressions → 
Dominant emotion detected → Songs fetched from database + Spotify → 
User can play recommended songs
```

### 2. **Song Recommendation Flow**
```
Mood detected → Query database for matching songs → 
Fetch Spotify recommendations → Combine results → 
Display to user with play controls
```

### 3. **User Data Flow**
```
User actions → API calls → Database updates → 
Mood history tracking → Analytics generation → 
Personalized insights
```

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API request rate limiting (100 requests/15 minutes)
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Configured CORS for security
- **Helmet Security**: Security headers and protection
- **Password Hashing**: bcryptjs for secure password storage
- **File Upload Security**: Multer with file type validation

---

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String
  },
  preferences: {
    favoriteGenres: [String],
    moodHistory: [{
      mood: String,
      timestamp: Date,
      songId: ObjectId
    }],
    settings: {
      autoPlay: Boolean,
      notifications: Boolean,
      theme: String
    }
  }
}
```

### Song Model
```javascript
{
  title: String,
  artist: String,
  mood: String (enum),
  genre: String,
  audioUrl: String,
  coverImage: String,
  duration: Number,
  fileSize: Number,
  fileFormat: String,
  metadata: {
    album: String,
    year: Number,
    bpm: Number,
    key: String,
    tags: [String]
  },
  stats: {
    playCount: Number,
    likeCount: Number,
    downloadCount: Number,
    lastPlayed: Date
  },
  source: String (enum),
  externalId: String,
  uploadedBy: ObjectId (ref: User)
}
```

---

## 🚀 Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-moody-player

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set IMAGEKIT_PUBLIC_KEY=your_imagekit_key
# ... set all other environment variables

# Deploy
git push heroku main
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧪 Testing

### Backend Testing
```bash
# Install test dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Testing
```bash
# Install React testing tools
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **FaceAPI.js** - For facial expression recognition
- **Spotify Web API** - For music recommendations
- **ImageKit** - For cloud file storage
- **MongoDB** - For database management
- **React Community** - For excellent documentation

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Prakherbhatnagar/moody-player/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Prakherbhatnagar/moody-player/discussions)
- **Email**: [Your Email]

---

## 🎉 Features Roadmap

- [ ] **Mobile App**: React Native version
- [ ] **Voice Commands**: Speech recognition integration
- [ ] **Social Features**: Share playlists with friends
- [ ] **Advanced Analytics**: Machine learning insights
- [ ] **Offline Mode**: Download songs for offline listening
- [ ] **Multi-language**: Internationalization support
- [ ] **Dark/Light Theme**: Theme customization
- [ ] **Playlist Collaboration**: Collaborative playlist editing

---

**Made with ❤️ by [Prakher Bhatnagar](https://github.com/Prakherbhatnagar)**

*Experience the future of music with AI-powered mood detection!* 🎵✨
