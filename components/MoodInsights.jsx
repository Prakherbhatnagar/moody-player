import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Brain, RefreshCw } from 'lucide-react';
import axios from 'axios';

const MoodInsights = ({ user, insights, onFetch }) => {
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    if (user && !insights) {
      onFetch();
    }
  }, [user, insights, onFetch]);

  const fetchTrends = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('moody_token');
      const response = await axios.get('http://localhost:3000/api/moods/trends', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrends(response.data);
    } catch (error) {
      console.error('Error fetching trends:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: '#fbbf24',
      sad: '#3b82f6',
      neutral: '#6b7280',
      angry: '#ef4444',
      surprised: '#8b5cf6',
      disgusted: '#10b981',
      fearful: '#6366f1'
    };
    return colors[mood] || '#6b7280';
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      neutral: '😐',
      angry: '😠',
      surprised: '😲',
      disgusted: '🤢',
      fearful: '😨'
    };
    return emojis[mood] || '😐';
  };

  if (!user) {
    return (
      <div className="insights-card">
        <div className="insights-placeholder">
          <Brain size={48} className="placeholder-icon" />
          <h3>Please sign in to view your mood insights</h3>
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="insights-card">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="insights-container">
      <div className="insights-header">
        <h2 className="insights-title">
          <Brain size={28} />
          Your Mood Insights
        </h2>
        <button 
          className="refresh-btn"
          onClick={() => { onFetch(); fetchTrends(); }}
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? 'spinning' : ''} />
          Refresh
        </button>
      </div>

      <div className="insights-grid">
        {insights.insights?.map((insight, index) => (
          <div key={index} className="insight-card">
            <div className="insight-header">
              <h3 className="insight-title">{insight.title}</h3>
            </div>
            
            {insight.type === 'most_common_mood' && (
              <div className="mood-display">
                <div className="mood-emoji">{getMoodEmoji(insight.value)}</div>
                <div className="mood-info">
                  <span className="mood-name">{insight.value}</span>
                  <p className="mood-description">{insight.description}</p>
                </div>
              </div>
            )}

            {insight.type === 'mood_frequency' && (
              <div className="frequency-chart">
                {insight.data.map((item, idx) => (
                  <div key={idx} className="frequency-item">
                    <div className="frequency-label">
                      <span className="mood-emoji-small">{getMoodEmoji(item.mood)}</span>
                      <span className="mood-name-small">{item.mood}</span>
                    </div>
                    <div className="frequency-bar">
                      <div 
                        className="frequency-fill"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: getMoodColor(item.mood)
                        }}
                      />
                    </div>
                    <span className="frequency-percentage">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            )}

            {insight.type === 'recent_trend' && (
              <div className="trend-display">
                <div className="trend-moods">
                  {insight.data.map((mood, idx) => (
                    <div 
                      key={idx} 
                      className="trend-mood"
                      style={{ backgroundColor: getMoodColor(mood) }}
                    >
                      {getMoodEmoji(mood)}
                    </div>
                  ))}
                </div>
                <p className="trend-description">{insight.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {trends && (
        <div className="trends-section">
          <h3 className="trends-title">
            <TrendingUp size={24} />
            Mood Trends ({trends.period})
          </h3>
          <div className="trends-chart">
            {Object.entries(trends.trends).map(([date, moods]) => (
              <div key={date} className="trend-day">
                <div className="trend-date">{new Date(date).toLocaleDateString()}</div>
                <div className="trend-moods">
                  {Object.entries(moods).map(([mood, count]) => (
                    <div 
                      key={mood}
                      className="trend-mood-item"
                      style={{ backgroundColor: getMoodColor(mood) }}
                      title={`${mood}: ${count} times`}
                    >
                      {getMoodEmoji(mood)}
                      <span className="trend-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="insights-footer">
        <p className="insights-summary">
          Based on {insights.totalDetections} mood detections since {new Date(insights.userSince).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MoodInsights;
