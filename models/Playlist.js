const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral', 'angry', 'surprised', 'disgusted', 'fearful', 'mixed'],
    default: 'mixed'
  },
  songs: [{
    song: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    order: {
      type: Number,
      default: 0
    }
  }],
  coverImage: {
    type: String,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stats: {
    playCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    lastPlayed: Date
  },
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
playlistSchema.index({ createdBy: 1, createdAt: -1 });
playlistSchema.index({ mood: 1, isPublic: 1 });
playlistSchema.index({ 'stats.playCount': -1 });
playlistSchema.index({ tags: 1 });

// Virtual for song count
playlistSchema.virtual('songCount').get(function() {
  return this.songs.length;
});

// Method to add song to playlist
playlistSchema.methods.addSong = function(songId) {
  const existingSong = this.songs.find(s => s.song.toString() === songId.toString());
  if (!existingSong) {
    this.songs.push({
      song: songId,
      order: this.songs.length
    });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove song from playlist
playlistSchema.methods.removeSong = function(songId) {
  this.songs = this.songs.filter(s => s.song.toString() !== songId.toString());
  return this.save();
};

// Method to reorder songs
playlistSchema.methods.reorderSongs = function(songOrders) {
  this.songs.forEach(song => {
    if (songOrders[song.song.toString()] !== undefined) {
      song.order = songOrders[song.song.toString()];
    }
  });
  this.songs.sort((a, b) => a.order - b.order);
  return this.save();
};

module.exports = mongoose.model('Playlist', playlistSchema);
