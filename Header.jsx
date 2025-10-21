import React from 'react';
import { Music, Camera, Upload, User, BarChart3, LogIn, UserPlus, LogOut } from 'lucide-react';

const Header = ({ 
  currentView, 
  setCurrentView, 
  user, 
  onLogin, 
  onRegister, 
  onLogout, 
  onProfile, 
  onInsights 
}) => {
  const navItems = [
    { id: 'detect', label: 'Detect Mood', icon: Camera },
    { id: 'upload', label: 'Upload Song', icon: Upload }
  ];

  if (user) {
    navItems.push(
      { id: 'insights', label: 'Insights', icon: BarChart3 },
      { id: 'profile', label: 'Profile', icon: User }
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Music size={28} />
            </div>
            <div className="logo-text">
              <h1 className="logo-title">Moody Player</h1>
              <p className="logo-subtitle">AI-Powered Music Experience</p>
            </div>
          </div>
          
          <div className="nav-buttons">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`nav-button ${currentView === item.id ? 'active' : ''}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="auth-section">
            {user ? (
              <div className="user-menu">
                <div className="user-info">
                  <span className="user-name">
                    {user.profile?.firstName || user.username}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="auth-button logout"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button
                  onClick={onLogin}
                  className="auth-button login"
                >
                  <LogIn size={18} />
                  Login
                </button>
                <button
                  onClick={onRegister}
                  className="auth-button register"
                >
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;