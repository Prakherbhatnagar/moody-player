#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔑 Moody Player - API Keys Setup');
console.log('================================\n');

console.log('I\'ll help you enter your API keys and integrate them into your code!\n');

const questions = [
  {
    key: 'MONGODB_URI',
    name: 'MongoDB Atlas Connection String',
    required: true,
    example: 'mongodb+srv://username:password@cluster.mongodb.net/moody-player',
    help: 'Get this from MongoDB Atlas dashboard → Clusters → Connect → Connect your application'
  },
  {
    key: 'IMAGEKIT_PUBLIC_KEY',
    name: 'ImageKit Public Key',
    required: true,
    example: 'public_xxxxxxxxxxxxxxxxxxxx',
    help: 'Get this from ImageKit dashboard → Developer Options'
  },
  {
    key: 'IMAGEKIT_PRIVATE_KEY',
    name: 'ImageKit Private Key',
    required: true,
    example: 'private_xxxxxxxxxxxxxxxxxxxx',
    help: 'Get this from ImageKit dashboard → Developer Options'
  },
  {
    key: 'IMAGEKIT_URL_ENDPOINT',
    name: 'ImageKit URL Endpoint',
    required: true,
    example: 'https://ik.imagekit.io/your_id',
    help: 'Get this from ImageKit dashboard → Developer Options'
  },
  {
    key: 'SPOTIFY_CLIENT_ID',
    name: 'Spotify Client ID',
    required: true,
    example: '1234567890abcdef1234567890abcdef',
    help: 'Get this from Spotify Developer dashboard → Your App → Settings'
  },
  {
    key: 'SPOTIFY_CLIENT_SECRET',
    name: 'Spotify Client Secret',
    required: true,
    example: 'abcdef1234567890abcdef1234567890',
    help: 'Get this from Spotify Developer dashboard → Your App → Settings'
  },
  {
    key: 'LASTFM_API_KEY',
    name: 'Last.fm API Key',
    required: false,
    example: 'your_lastfm_api_key_here',
    help: 'Get this from Last.fm API account (optional)'
  },
  {
    key: 'YOUTUBE_API_KEY',
    name: 'YouTube API Key',
    required: false,
    example: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    help: 'Get this from Google Cloud Console (optional)'
  }
];

const envVars = {};

function askQuestion(index) {
  if (index >= questions.length) {
    saveEnvironmentVariables();
    return;
  }

  const q = questions[index];
  console.log(`\n${index + 1}. ${q.name} ${q.required ? '(REQUIRED)' : '(OPTIONAL)'}`);
  console.log(`   Help: ${q.help}`);
  console.log(`   Example: ${q.example}`);
  
  rl.question(`Enter your ${q.name}: `, (answer) => {
    if (answer.trim()) {
      envVars[q.key] = answer.trim();
      console.log(`✅ ${q.name} saved!`);
    } else if (q.required) {
      console.log(`⚠️  ${q.name} is required. Please enter a value.`);
      askQuestion(index);
      return;
    } else {
      console.log(`⏭️  Skipping ${q.name} (optional)`);
    }
    askQuestion(index + 1);
  });
}

function saveEnvironmentVariables() {
  console.log('\n🔧 Creating environment files...');
  
  // Create .env file for local development
  const envContent = `# 🌐 Core Application Variables
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3000

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

  // Create .env.production file for Vercel deployment
  const envProductionContent = `# 🌐 Core Application Variables
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

  // Save files
  fs.writeFileSync('.env', envContent);
  fs.writeFileSync('.env.production', envProductionContent);
  
  console.log('\n✅ Environment variables saved!');
  console.log('📁 Files created:');
  console.log('   - .env (for local development)');
  console.log('   - .env.production (for Vercel deployment)');
  
  console.log('\n🚀 Next steps:');
  console.log('1. Test locally: npm run dev');
  console.log('2. Deploy to Vercel: Add these variables to Vercel dashboard');
  console.log('3. Your app will be live!');
  
  console.log('\n📋 Vercel Environment Variables to add:');
  Object.keys(envVars).forEach(key => {
    if (envVars[key]) {
      console.log(`   ${key}=${envVars[key]}`);
    }
  });
  
  rl.close();
}

console.log('Let\'s set up your API keys! Press Enter to skip optional fields.\n');
askQuestion(0);
