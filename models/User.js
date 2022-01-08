const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  likedPhotos: {
    type: [String],
  },
  creatdeOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = User = mongoose.model('user', UserSchema);
