const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting Moody Player Server...');
console.log('Environment:', process.env.NODE_ENV || 'development');

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MONGODB_URI not found, using default');
      await mongoose.connect('mongodb://localhost:27017/moody-player');
    } else {
      console.log('🔗 Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI);
    }
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
}

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
    message: 'Moody Player API is working!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Basic routes (without complex middleware)
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

// Start server
async function startServer() {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  });
}

startServer().catch(console.error);
