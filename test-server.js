const express = require('express');
const app = express();
const PORT = 3000;

console.log('🧪 Starting minimal test server...');

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Test server is working!',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Moody Player API is running!',
    version: '1.0.0'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Handle errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
