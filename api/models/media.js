const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['tv', 'movie'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Media', MediaSchema);
