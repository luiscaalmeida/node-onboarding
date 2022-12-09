const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavouritesSchema = new Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ['admin', 'guest'],
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

module.exports = mongoose.model('Favourites', FavouritesSchema);
