const mongoose = require('mongoose')

const challengesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  participants: {
    type: Number,
    required: true
  },
    daysRemaining: {
    type: Number,
    required: true
  },
    badge: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

challengesSchema.methods.toJSON = function() {
  const obj = this.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Challenges', challengesSchema);
 
