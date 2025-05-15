const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'link', 'image']
  },
  content: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    // Only required for images
    required: function() {
      return this.type === 'image';
    }
  },
  mimeType: {
    type: String,
    // Only required for images
    required: function() {
      return this.type === 'image';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Content', contentSchema); 