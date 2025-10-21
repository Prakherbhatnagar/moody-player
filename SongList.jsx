import React, { useState, useRef } from 'react';
import { Music, Play, Pause } from 'lucide-react';

const SongList = ({ songs, spotifySongs, detectedMood, loading, user }) => {
  const [playingSongId, setPlayingSongId] = useState(null);
  const audioRefs = useRef({});

  const moodConfig = {
    happy: { color: 'mood-happy', label: 'Happy' },
    sad: { color: 'mood-sad', label: 'Sad' },
    neutral: { color: 'mood-neutral', label: 'Neutral' },
    angry: { color: 'mood-angry', label: 'Angry' },
    surprised: { color: 'mood-surprised', label: 'Surprised' },
    disgusted: { color: 'mood-disgusted', label: 'Disgusted' },
    fearful: { color: 'mood-fearful', label: 'Fearful' }
  };

  const togglePlay = (song) => {
    const audio = audioRefs.current[song._id];
    
    if (playingSongId === song._id) {
      audio.pause();
      setPlayingSongId(null);
    } else {
      // Pause any currently playing song
      Object.keys(audioRefs.current).forEach(id => {
        if (audioRefs.current[id]) {
          audioRefs.current[id].pause();
        }
      });
      
      audio.play();
      setPlayingSongId(song._id);
    }
  };

  const handleAudioEnded = (songId) => {
    setPlayingSongId(null);
  };

  if (loading) {
    return (
      <div className="songs-card">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading songs...</p>
        </div>
      </div>
    );
  }

  const allSongs = [...songs, ...spotifySongs];

  return (
    <div className="songs-container">
      <div className="songs-card">
        <h3 className="songs-title">
          <Music size={24} />
          Songs for Your Mood
        </h3>
        
        {songs.length > 0 && (
          <div className="songs-section">
            <h4 className="section-title">Uploaded Songs</h4>
            <div className="songs-grid">
              {songs.map((song) => (
                <div key={song._id} className="song-item">
                  <div className="song-content">
                    <div className="song-play-section">
                      <button
                        onClick={() => togglePlay(song)}
                        className="play-button"
                      >
                        {playingSongId === song._id ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} className="play-icon" />
                        )}
                      </button>
                      <div className="song-details">
                        <h4 className="song-title">{song.title}</h4>
                        <p className="song-artist">{song.artist}</p>
                      </div>
                    </div>
                    <div className={`song-mood-badge ${moodConfig[song.mood].color}`}>
                      {moodConfig[song.mood].label}
                    </div>
                  </div>
                  
                  <audio
                    ref={(el) => (audioRefs.current[song._id] = el)}
                    src={song.audioUrl}
                    onEnded={() => handleAudioEnded(song._id)}
                    preload="metadata"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {spotifySongs.length > 0 && (
          <div className="songs-section">
            <h4 className="section-title">Spotify Recommendations</h4>
            <div className="songs-grid">
              {spotifySongs.map((song, index) => (
                <div key={`spotify-${index}`} className="song-item spotify-song">
                  <div className="song-content">
                    <div className="song-play-section">
                      <button
                        onClick={() => togglePlay(song)}
                        className="play-button"
                      >
                        {playingSongId === `spotify-${index}` ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} className="play-icon" />
                        )}
                      </button>
                      <div className="song-details">
                        <h4 className="song-title">{song.title}</h4>
                        <p className="song-artist">{song.artist}</p>
                        {song.previewUrl && (
                          <p className="song-source">Preview available</p>
                        )}
                      </div>
                    </div>
                    <div className="song-actions">
                      <div className={`song-mood-badge ${moodConfig[song.mood].color}`}>
                        {moodConfig[song.mood].label}
                      </div>
                      {song.externalUrl && (
                        <a 
                          href={song.externalUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="spotify-link"
                        >
                          Open in Spotify
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {song.previewUrl && (
                    <audio
                      ref={(el) => (audioRefs.current[`spotify-${index}`] = el)}
                      src={song.previewUrl}
                      onEnded={() => handleAudioEnded(`spotify-${index}`)}
                      preload="metadata"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {allSongs.length === 0 && !loading && (
          <div className="no-songs">
            <Music size={48} className="no-songs-icon" />
            <p>No songs found for this mood. Try uploading some songs!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongList;