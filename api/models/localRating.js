const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalRatingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mediaId: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('LocalRating', LocalRatingSchema);
