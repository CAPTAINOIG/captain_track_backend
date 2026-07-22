const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
   profilePicture: {
    type: String,
    required: false,
    default: 'https://res.cloudinary.com/dbp6ovv7b/image/upload/v1715783819/tvf5apwj5bwmwf2qjfhh.png',
  },
  bio: {
    type: String,
    required: false,
    default: 'Marathon runner & fitness enthusiast',
  },
  aboutMe: {
    type: String,
    required: false,
    default: 'Hey there, I am using chat app',
    maxlength: 200,
  },
  username: {
    type: String,
    required: false,
    maxlength: 50,
  },
  followers: {
    type: Number,
    default: 10000,
  },
  following: {
    type: Number,
    default: 100,
  },
  otp: {
    type: String,
  },
}, {
  timestamps: true
});

collectionSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Add toJSON method to exclude password
collectionSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', collectionSchema);
