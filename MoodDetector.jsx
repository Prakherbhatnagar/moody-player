import React from 'react';
import { Camera, Smile, Frown, Meh, AlertCircle, Sparkles } from 'lucide-react';

const MoodDetector = ({ 
  videoRef, 
  canvasRef, 
  isDetecting, 
  detectedMood, 
  startDetection, 
  stopDetection,
  modelsLoaded 
}) => {
  const moodConfig = {
    happy: { color: 'mood-happy', icon: Smile, label: 'Happy', gradient: 'from-yellow-400 to-orange-500' },
    sad: { color: 'mood-sad', icon: Frown, label: 'Sad', gradient: 'from-blue-400 to-indigo-600' },
    neutral: { color: 'mood-neutral', icon: Meh, label: 'Neutral', gradient: 'from-gray-400 to-gray-600' },
    angry: { color: 'mood-angry', icon: AlertCircle, label: 'Angry', gradient: 'from-red-500 to-rose-700' },
    surprised: { color: 'mood-surprised', icon: Sparkles, label: 'Surprised', gradient: 'from-purple-400 to-pink-500' },
    disgusted: { color: 'mood-disgusted', icon: Frown, label: 'Disgusted', gradient: 'from-green-500 to-teal-600' },
    fearful: { color: 'mood-fearful', icon: AlertCircle, label: 'Fearful', gradient: 'from-indigo-500 to-purple-700' }
  };

  const MoodIcon = detectedMood ? moodConfig[detectedMood].icon : Camera;
  const moodData = detectedMood ? moodConfig[detectedMood] : null;

  return (
    <div className="detector-card">
      <div className="detector-header">
        <h2 className="detector-title">Mood Detection</h2>
        <p className="detector-subtitle">
          Let AI analyze your emotions and find the perfect song
        </p>
      </div>

      <div className="video-container">
        <div className="video-wrapper">
          {isDetecting ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                width="640"
                height="480"
                className="video-feed"
              />
              <canvas
                ref={canvasRef}
                width="640"
                height="480"
                className="video-canvas"
              />
            </>
          ) : (
            <div className="video-placeholder">
              <Camera size={80} className="placeholder-icon" />
              <p className="placeholder-text">Camera feed will appear here</p>
              {!modelsLoaded && (
                <p className="loading-models">Loading AI models...</p>
              )}
            </div>
          )}

          {detectedMood && (
            <div className="mood-overlay">
              <div className={`mood-badge ${moodData.color}`}>
                <MoodIcon size={32} />
                <div className="mood-info">
                  <p className="mood-label">Detected Mood</p>
                  <p className="mood-value">{moodData.label}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detector-actions">
        {!isDetecting ? (
          <button
            onClick={startDetection}
            className="btn-primary btn-large"
            disabled={!modelsLoaded}
          >
            <Camera size={20} />
            {modelsLoaded ? 'Start Detection' : 'Loading...'}
          </button>
        ) : (
          <button
            onClick={stopDetection}
            className="btn-danger btn-large"
          >
            Stop Camera
          </button>
        )}
      </div>
    </div>
  );
};

export default MoodDetector;