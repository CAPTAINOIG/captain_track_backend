const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Run', 'Walk', 'Cycle', 'Swim'] // Add more types as needed
  },
  distance: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  pace: {
    type: Number,
    required: true
  },
  avgSpeed: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  elevation: {
    type: Number,
    required: true
  },
  coords: {
    type: [[Number]], // Array of [lat, lng] pairs
    default: []
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  splits: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

// Add toJSON method to rename _id to id for frontend
activitySchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Activity', activitySchema);
 
