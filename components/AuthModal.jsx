import React, { useState } from 'react';
import { X, User, Lock, Mail, UserPlus, LogIn } from 'lucide-react';

const AuthModal = ({ mode, onClose, onAuth, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onAuth(formData);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLogin = mode === 'login';

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <div className="auth-header">
          <div className="auth-icon">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
          </div>
          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Join Moody Player'}
          </h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Sign in to your account to continue' 
              : 'Create an account to start your musical journey'
            }
          </p>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
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
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your last name"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary btn-large btn-full-width"
            disabled={loading}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button className="auth-switch-btn" onClick={onSwitchMode}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
