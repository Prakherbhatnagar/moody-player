import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';

const SongUpload = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    mood: 'happy',
    audioFile: null
  });
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const moods = [
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Sad' },
    { value: 'neutral', label: 'Neutral' },
    { value: 'angry', label: 'Angry' },
    { value: 'surprised', label: 'Surprised' },
    { value: 'disgusted', label: 'Disgusted' },
    { value: 'fearful', label: 'Fearful' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, audioFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.artist || !formData.audioFile) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setUploading(true);
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('artist', formData.artist);
      data.append('mood', formData.mood);
      data.append('audio', formData.audioFile);

      await axios.post('http://localhost:3000/songs/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadSuccess(true);
      setFormData({
        title: '',
        artist: '',
        mood: 'happy',
        audioFile: null
      });

      // Reset file input
      document.getElementById('audio-upload').value = '';

      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload song. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-card">
      <div className="upload-header">
        <div className="upload-icon-wrapper">
          <Upload size={32} />
        </div>
        <h2 className="upload-title">Upload New Song</h2>
        <p className="upload-subtitle">Add your favorite tracks to the collection</p>
      </div>

      <div className="upload-form">
        <div className="form-group">
          <label className="form-label">Song Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter song title"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Artist</label>
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter artist name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mood</label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleInputChange}
            className="form-select"
          >
            {moods.map((mood) => (
              <option key={mood.value} value={mood.value}>
                {mood.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Audio File</label>
          <div className="file-upload-wrapper">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="file-input"
              id="audio-upload"
            />
            <label htmlFor="audio-upload" className="file-label">
              <Upload size={32} className="file-icon" />
              <span className="file-text">
                {formData.audioFile ? formData.audioFile.name : 'Click to upload audio file'}
              </span>
              <span className="file-hint">MP3, WAV, OGG supported</span>
            </label>
          </div>
        </div>

        {uploadSuccess && (
          <div className="success-message">
            ✓ Song uploaded successfully!
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="btn-primary btn-large btn-full-width"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Song'}
        </button>
      </div>
    </div>
  );
};

export default SongUpload;