import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import axios from 'axios';
import MoodDetector from './components/MoodDetector';
import SongUpload from './components/SongUpload';
import SongList from './components/SongList';
import Header from './components/Header';
import AuthModal from './components/AuthModal';
import UserProfile from './components/UserProfile';
import MoodInsights from './components/MoodInsights';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('detect');
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [spotifySongs, setSpotifySongs] = useState([]);
  const [moodInsights, setMoodInsights] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load Face-API models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]);
        setModelsLoaded(true);
        console.log('Face-API models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };
    loadModels();
  }, []);

  // Check for existing auth token
  useEffect(() => {
    const token = localStorage.getItem('moody_token');
    if (token) {
      fetchUserProfile();
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('moody_token');
      const response = await axios.get('http://localhost:3000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('moody_token');
    }
  };

  // Fetch songs by mood
  const fetchSongsByMood = async (mood) => {
    try {
      setLoading(true);
      
      // Fetch uploaded songs
      const response = await axios.get(`http://localhost:3000/api/songs?mood=${mood}`);
      setSongs(response.data.songs || []);
      
      // Fetch Spotify recommendations
      try {
        const spotifyResponse = await axios.get(`http://localhost:3000/api/spotify/recommendations/${mood}`);
        setSpotifySongs(spotifyResponse.data.tracks || []);
      } catch (spotifyError) {
        console.log('Spotify API not available:', spotifyError.message);
      }
      
      // Record mood detection for user
      if (user) {
        try {
          await axios.post('http://localhost:3000/api/moods/detect', {
            mood,
            songId: response.data.songs?.[0]?._id
          }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('moody_token')}` }
          });
        } catch (moodError) {
          console.log('Could not record mood detection:', moodError.message);
        }
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Start mood detection
  const startDetection = async () => {
    if (!modelsLoaded) {
      alert('AI models are still loading. Please wait...');
      return;
    }

    try {
      setIsDetecting(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        detectMood();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Please allow camera access to detect your mood');
      setIsDetecting(false);
    }
  };

  // Detect mood using Face-API
  const detectMood = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const detectionInterval = setInterval(async () => {
      if (!isDetecting) {
        clearInterval(detectionInterval);
        return;
      }

      const detection = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detection) {
        const expressions = detection.expressions;
        const dominantMood = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );

        setDetectedMood(dominantMood);
        await fetchSongsByMood(dominantMood);

        // Draw on canvas
        const canvas = canvasRef.current;
        const displaySize = { 
          width: videoRef.current.width, 
          height: videoRef.current.height 
        };
        faceapi.matchDimensions(canvas, displaySize);
        const resizedDetection = faceapi.resizeResults(detection, displaySize);
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetection);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
      }
    }, 100);
  };

  // Stop detection
  const stopDetection = () => {
    setIsDetecting(false);
    setDetectedMood(null);
    setSongs([]);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  // Handle authentication
  const handleAuth = async (authData) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/${authMode}`, authData);
      localStorage.setItem('moody_token', response.data.token);
      setUser(response.data.user);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Auth error:', error);
      alert(error.response?.data?.error || 'Authentication failed');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('moody_token');
    setUser(null);
    setSongs([]);
    setSpotifySongs([]);
    setMoodInsights(null);
  };

  // Fetch mood insights
  const fetchMoodInsights = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get('http://localhost:3000/api/moods/insights', {
        headers: { Authorization: `Bearer ${localStorage.getItem('moody_token')}` }
      });
      setMoodInsights(response.data);
    } catch (error) {
      console.error('Error fetching mood insights:', error);
    }
  };

  return (
    <div className="app">
      <div className="background-blur"></div>
      
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        user={user}
        onLogin={() => { setAuthMode('login'); setShowAuthModal(true); }}
        onRegister={() => { setAuthMode('register'); setShowAuthModal(true); }}
        onLogout={handleLogout}
        onProfile={() => setCurrentView('profile')}
        onInsights={() => setCurrentView('insights')}
      />

      <main className="main-content">
        {currentView === 'detect' ? (
          <>
            <MoodDetector
              videoRef={videoRef}
              canvasRef={canvasRef}
              isDetecting={isDetecting}
              detectedMood={detectedMood}
              startDetection={startDetection}
              stopDetection={stopDetection}
              modelsLoaded={modelsLoaded}
            />
            
            {songs.length > 0 && (
              <SongList 
                songs={songs} 
                spotifySongs={spotifySongs}
                detectedMood={detectedMood} 
                loading={loading}
                user={user}
              />
            )}
          </>
        ) : currentView === 'upload' ? (
          <SongUpload user={user} />
        ) : currentView === 'profile' ? (
          <UserProfile user={user} onUpdate={fetchUserProfile} />
        ) : currentView === 'insights' ? (
          <MoodInsights 
            user={user} 
            insights={moodInsights}
            onFetch={fetchMoodInsights}
          />
        ) : null}
      </main>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuth={handleAuth}
          onSwitchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      )}

      <footer className="footer">
        <p>Moody Player © 2025 - AI-Powered Music Experience</p>
      </footer>
    </div>
  );
}

export default App;