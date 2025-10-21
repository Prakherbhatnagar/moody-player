const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'neutral', 'angry', 'surprised', 'disgusted', 'fearful'],
    index: true
  },
  genre: {
    type: String,
    trim: true,
    maxlength: 50
  },
  audioUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: null
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  fileSize: {
    type: Number, // in bytes
    default: 0
  },
  fileFormat: {
    type: String,
    enum: ['mp3', 'wav', 'ogg', 'm4a'],
    default: 'mp3'
  },
  metadata: {
    album: String,
    year: Number,
    bpm: Number,
    key: String,
    tags: [String]
  },
  stats: {
    playCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    downloadCount: { type: Number, default: 0 },
    lastPlayed: Date
  },
  source: {
    type: String,
    enum: ['uploaded', 'spotify', 'youtube', 'lastfm'],
    default: 'uploaded'
  },
  externalId: {
    type: String, // For external API songs
    sparse: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
songSchema.index({ mood: 1, isActive: 1 });
songSchema.index({ artist: 1, title: 1 });
songSchema.index({ uploadedBy: 1, createdAt: -1 });
songSchema.index({ 'stats.playCount': -1 });
songSchema.index({ genre: 1, mood: 1 });

// Virtual for formatted duration
songSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Method to increment play count
songSchema.methods.incrementPlayCount = function() {
  this.stats.playCount += 1;
  this.stats.lastPlayed = new Date();
  return this.save();
};

// Static method to get popular songs by mood
songSchema.statics.getPopularByMood = function(mood, limit = 10) {
  return this.find({ mood, isActive: true })
    .sort({ 'stats.playCount': -1 })
    .limit(limit);
};

// Static method to search songs
songSchema.statics.searchSongs = function(query, mood = null) {
  const searchQuery = {
    isActive: true,
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { artist: { $regex: query, $options: 'i' } },
      { genre: { $regex: query, $options: 'i' } }
    ]
  };
  
  if (mood) {
    searchQuery.mood = mood;
  }
  
  return this.find(searchQuery).sort({ 'stats.playCount': -1 });
};

module.exports = mongoose.model('Song', songSchema);
