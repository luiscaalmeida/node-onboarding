const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TvSeriesSchema = new Schema({
  key: {
    type: Number,
    required: true,
    unique: true,
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

module.exports = mongoose.model('Tvseries', TvSeriesSchema);
