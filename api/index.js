const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting Moody Player on Vercel...');
console.log('Environment:', process.env.NODE_ENV || 'production');

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MONGODB_URI not found');
      return;
    }
    
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
}

// Connect to database
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Moody Player API is working on Vercel!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Basic routes
app.get('/api/songs', (req, res) => {
  res.json({
    message: 'Songs endpoint working',
    songs: []
  });
});

app.get('/api/moods', (req, res) => {
  res.json({
    message: 'Moods endpoint working',
    moods: ['happy', 'sad', 'neutral', 'angry', 'surprised', 'disgusted', 'fearful']
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Moody Player API',
    version: '1.0.0',
    status: 'running',
    app_url: 'https://moody-player-ai.vercel.app',
    endpoints: [
      '/api/health',
      '/api/test',
      '/api/songs',
      '/api/moods'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Export for Vercel
module.exports = app;
