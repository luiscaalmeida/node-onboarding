const express = require('express');
const Playlist = require('../models/playlist');
const User = require('../models/user');
const Media = require('../models/media');
const async = require('async');
const router = express.Router();

router.get('/getAllPlaylists', (req, res, next) => {
  const username = req.query.username;
  console.log("GET");
  console.log(req.query);
  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) return callback(err);
        else callback(null, user);
      });
    },
    function(user, callback) {
      const userId = user._id;
      Playlist.find({userId: userId}, (err, lists) => {
        console.log(lists);
        if (err) return callback(err);
        else {
          console.log(lists);
          if (!lists) callback(null, null);
          else if (lists.length === 0) callback(null, null);
          else callback(null, lists);
        }
      });
    },
  ], function(err, lists) {
    if (err) return next(err);
    else {
      const playlists = lists?.map(list => ({_id: list._id, name: list.name}));
      console.log(playlists);
      return res.json({
        playlists: playlists,
      });
    }
  });
});

router.post('/addMediaToPlaylist', (req, res, next) => {
  const username = req.body.username;
  const media = req.body.media;
  const playlistName = req.body.playlistName;

  console.log("POST");
  console.log(req.body);

  async.waterfall([
    function(callback) {
      Media.findOne({id: media.id}, (err, foundMedia) => {
        if (err) {
          console.log(err);
          return callback(null, err);
        }
        else {
          if (!foundMedia) {
            const newMedia = new Media({
              id: media.id,
              type: media.type,
              title: media.title,
              imageUrl: media.imageUrl,
              mediaUrl: media.mediaUrl,
              overview: media.overview,
            });
            newMedia.save((err, savedMedia) => {
              if (err) {
                console.log(err);
                return callback(null, err);
              }
              else callback(null, savedMedia);
            });
          }
          else callback(null, foundMedia);
        }
      });
    },
    function(media, callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) {
          console.log(err);
          return callback(null, err);
        }
        else callback(null, user, media);
      });
    },
    function(user, media, callback) {
      // console.log(user);
      console.log(media);
      console.log(playlistName);
      const userId = user._id;
      Playlist.findOne({userId: userId, name: playlistName}, (err, playlist) => {
        if (err) {
          console.log(err);
          return callback(null, err);
        }
        else {
          if (!playlist) {
            const createdPlaylist = new Playlist({userId: userId, name: playlistName, media_list: [media]});
            createdPlaylist.save((err, newPlaylist) => {
              if (err) {
                console.log(err);
                return callback(null, err);
              }
              else callback(null, newPlaylist);
            });
          }
          else {
            playlist.media_list.push(media);
            playlist.save((err, newPlaylist) => {
              if (err) {
                console.log(err);
                return callback(null, err);
              }
              else callback(null, newPlaylist);
            });
          }
        }
      });
    },
  ], function(err, result) {
    if (err) {
      console.log(err);
      return callback(null, err);
    }
    else return res.json({
      playlist: result,
    });
  });
});

module.exports = router;
