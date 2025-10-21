import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Music, Heart, Settings, Save } from 'lucide-react';
import axios from 'axios';

const UserProfile = ({ user, onUpdate }) => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    favoriteGenres: []
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        bio: user.profile?.bio || '',
        favoriteGenres: user.preferences?.favoriteGenres || []
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleGenreToggle = (genre) => {
    const genres = profile.favoriteGenres.includes(genre)
      ? profile.favoriteGenres.filter(g => g !== genre)
      : [...profile.favoriteGenres, genre];
    setProfile({ ...profile, favoriteGenres: genres });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('moody_token');
      await axios.put('http://localhost:3000/api/auth/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSaved(true);
      onUpdate();
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const genres = [
    'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical',
    'Blues', 'Country', 'R&B', 'Reggae', 'Folk', 'Indie'
  ];

  if (!user) {
    return (
      <div className="profile-card">
        <div className="profile-placeholder">
          <User size={48} className="placeholder-icon" />
          <h3>Please sign in to view your profile</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={32} />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">
              {user.profile?.firstName || user.username}
            </h2>
            <p className="profile-email">
              <Mail size={16} />
              {user.email}
            </p>
            <p className="profile-joined">
              <Calendar size={16} />
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <Music size={20} />
            <span className="stat-label">Songs Uploaded</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <Heart size={20} />
            <span className="stat-label">Mood Detections</span>
            <span className="stat-value">{user.preferences?.moodHistory?.length || 0}</span>
          </div>
          <div className="stat-item">
            <Settings size={20} />
            <span className="stat-label">Login Count</span>
            <span className="stat-value">{user.loginCount || 0}</span>
          </div>
        </div>
      </div>

      <div className="profile-edit-card">
        <div className="edit-header">
          <h3>Edit Profile</h3>
          {saved && <span className="save-indicator">✓ Saved!</span>}
        </div>

        <div className="edit-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Your first name"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Your last name"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Tell us about yourself..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Favorite Genres</label>
            <div className="genre-tags">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`genre-tag ${profile.favoriteGenres.includes(genre) ? 'active' : ''}`}
                  onClick={() => handleGenreToggle(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary btn-large"
            disabled={loading}
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
