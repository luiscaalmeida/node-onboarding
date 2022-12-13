const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  media_list: [{type: Schema.Types.ObjectId, ref: "Media", unique: true}],
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
