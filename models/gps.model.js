const mongoose = require ('mongoose')

const gpsSchema = new mongoose.Schema({
  activityId: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
})

module.exports = mongoose.model('Gps', gpsSchema);
