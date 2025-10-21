#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔑 Moody Player Environment Variables Setup');
console.log('==========================================\n');

const questions = [
  {
    key: 'MONGODB_URI',
    question: 'Enter your MongoDB Atlas connection string:',
    example: 'mongodb+srv://username:password@cluster.mongodb.net/moody-player'
  },
  {
    key: 'IMAGEKIT_PUBLIC_KEY',
    question: 'Enter your ImageKit Public Key:',
    example: 'public_xxxxxxxxxxxxxxxxxxxx'
  },
  {
    key: 'IMAGEKIT_PRIVATE_KEY',
    question: 'Enter your ImageKit Private Key:',
    example: 'private_xxxxxxxxxxxxxxxxxxxx'
  },
  {
    key: 'IMAGEKIT_URL_ENDPOINT',
    question: 'Enter your ImageKit URL Endpoint:',
    example: 'https://ik.imagekit.io/your_id'
  },
  {
    key: 'SPOTIFY_CLIENT_ID',
    question: 'Enter your Spotify Client ID:',
    example: '1234567890abcdef1234567890abcdef'
  },
  {
    key: 'SPOTIFY_CLIENT_SECRET',
    question: 'Enter your Spotify Client Secret:',
    example: 'abcdef1234567890abcdef1234567890'
  },
  {
    key: 'LASTFM_API_KEY',
    question: 'Enter your Last.fm API Key (optional):',
    example: 'your_lastfm_api_key_here'
  },
  {
    key: 'YOUTUBE_API_KEY',
    question: 'Enter your YouTube API Key (optional):',
    example: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    generateEnvFile();
    return;
  }

  const q = questions[index];
  rl.question(`${q.question}\nExample: ${q.example}\n> `, (answer) => {
    if (answer.trim()) {
      envVars[q.key] = answer.trim();
    }
    askQuestion(index + 1);
  });
}

function generateEnvFile() {
  const envContent = `# 🌐 Core Application Variables
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://moody-player-fkwe.vercel.app

# 🗄️ Database Configuration
MONGODB_URI=${envVars.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/moody-player'}

# 🔐 Security Configuration
JWT_SECRET=10300ca20c32ec8e40f34011b1c18e8f6caf424597ddebe0d611a6f3929d0bebb34b6e0719b4d5b8c5c4a44831fd765345efe497685f9653f7418595fa62753e

# 📁 File Storage (ImageKit)
IMAGEKIT_PUBLIC_KEY=${envVars.IMAGEKIT_PUBLIC_KEY || 'your_imagekit_public_key'}
IMAGEKIT_PRIVATE_KEY=${envVars.IMAGEKIT_PRIVATE_KEY || 'your_imagekit_private_key'}
IMAGEKIT_URL_ENDPOINT=${envVars.IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/your_id'}

# 🎵 Music APIs
SPOTIFY_CLIENT_ID=${envVars.SPOTIFY_CLIENT_ID || 'your_spotify_client_id'}
SPOTIFY_CLIENT_SECRET=${envVars.SPOTIFY_CLIENT_SECRET || 'your_spotify_client_secret'}
LASTFM_API_KEY=${envVars.LASTFM_API_KEY || 'your_lastfm_api_key'}
YOUTUBE_API_KEY=${envVars.YOUTUBE_API_KEY || 'your_youtube_api_key'}
`;

  fs.writeFileSync('.env.production', envContent);
  
  console.log('\n✅ Environment variables saved to .env.production');
  console.log('\n📋 Next steps:');
  console.log('1. Copy these variables to Vercel dashboard');
  console.log('2. Deploy your application');
  console.log('3. Test your API endpoints');
  
  rl.close();
}

console.log('Please enter your API keys. Press Enter to skip optional fields.\n');
askQuestion(0);
