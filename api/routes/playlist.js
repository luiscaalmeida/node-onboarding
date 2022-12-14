const express = require('express');
const Playlist = require('../models/playlist');
const User = require('../models/user');
const Media = require('../models/media');
const async = require('async');
const router = express.Router();

router.get('/getAllPlaylists', (req, res, next) => {
  const username = req.query.username;
  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) return callback(err);
        else callback(null, user);
      });
    },
    function(user, callback) {
      const userId = user._id;
      Playlist.find({userId: userId}).populate("media_list").exec((err, lists) => {
        if (err) return callback(err);
        else {
          if (!lists) callback(null, null);
          else if (lists.length === 0) callback(null, null);
          else callback(null, lists);
        }
      });
    },
  ], function(err, lists) {
    if (err) {
      console.log(err);
      return next(null, err);
    }
    else {
      // const playlists = lists?.map(list => ({_id: list._id, name: list.name}));
      return res.json({
        playlists: lists,
        // playlists: playlists,
      });
    }
  });
});

router.post('/addMediaToPlaylist', (req, res, next) => {
  const username = req.body.username;
  const media = req.body.media;
  const playlistName = req.body.playlistName;

  async.waterfall([
    function(callback) {
      Media.findOne({id: media.id}, (err, foundMedia) => {
        if (err) return callback(null, err);
        else {
          if (!foundMedia) {
            console.log("DID NOT FIND MEDIA");
            const newMedia = new Media({
              id: media.id,
              type: media.type,
              title: media.title,
              imageUrl: media.imageUrl,
              mediaUrl: media.mediaUrl,
              overview: media.overview,
            });
            newMedia.save((err, savedMedia) => {
              if (err) return callback(null, err);
              else {
                console.log("SAVED MEDIA");
                console.log(savedMedia);
                callback(null, savedMedia);
              }
            });
          }
          else {
            console.log("FOUND MEDIA");
            callback(null, foundMedia);
          }
        }
      });
    },
    function(media, callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) return callback(null, err);
        else callback(null, user, media);
      });
    },
    function(user, media, callback) {
      console.log("PRINT MEDIA");
      console.log(media);
      const userId = user._id;
      Playlist.findOne({userId: userId, name: playlistName}).populate("media_list").exec((err, playlist) => {
        if (err) return callback(null, err);
        else {
          if (!playlist) {
            const createdPlaylist = new Playlist({userId: userId, name: playlistName, media_list: [media]});
            createdPlaylist.save((err, newPlaylist) => {
              if (err) return callback(null, err);
              else callback(null, newPlaylist);
            });
          }
          else {
            if (playlist.media_list.filter(m => m.id === media.id).length > 0) {
              callback(null, playlist);
            }
            else {
              playlist.media_list.push(media);
              playlist.save((err, newPlaylist) => {
                if (err) {
                  console.log(err);
                  return callback(null, err);
                }
                else {
                  console.log(newPlaylist);
                  callback(null, newPlaylist);
                }
              });
            }
          }
        }
      });
    },
  ], function(err, result) {
    if (err) {
      console.log(err);
      return next(null, err);
    }
    else return res.json({
      playlist: result,
    });
  });
});


router.get('/isMediaInAnyPlaylist', (req, res, next) => {
  const username = req.query.username;
  const mediaId = parseInt(req.query.mediaId);
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
      Playlist.find({userId: userId}).populate("media_list").exec((err, lists) => {
        if (err) return callback(err);
        else {
          console.log(lists);
          if (!lists) callback(null, null);
          else if (lists.length === 0) callback(null, false);
          else {
            // callback(null, lists);
            const playlistsThatContainMedia = lists.filter(list => list.media_list.some(media => media.id === mediaId)).map(list => list.name);
            if (playlistsThatContainMedia?.length === 0) callback(null, false);
            else callback(null, playlistsThatContainMedia);
          }
        }
      });
    },
  ], function(err, playlists) {
    if (err) {
      console.log(err);
      return next(null, err);
    }
    else {
      console.log(playlists);
      return res.json({
        playlists: playlists,
      });
    }
  });
});


router.delete('/removeMediaFromPlaylist', (req, res, next) => {
  const username = req.body.username;
  const mediaId = parseInt(req.body.mediaId);
  const playlistName = req.body.playlistName;
  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) return callback(err);
        else callback(null, user);
      });
    },
    function(user, callback) {
      const userId = user._id;
      Playlist.findOne({userId: userId, name: playlistName}).populate("media_list").exec((err, playlist) => {
        if (err) return callback(err);
        else {
          console.log(playlist);
          if (!playlist) callback(null, null);
          else {
            playlist.media_list = playlist.media_list.filter(media => media.id !== mediaId);
            playlist.save((err, newPlaylist) => {
              if (err) return callback(null, err);
              else callback(null, newPlaylist);
            });
          }
        }
      });
    },
  ], function(err, playlist) {
    if (err) {
      console.log(err);
      return next(null, err);
    }
    else {
      console.log(playlist);
      return res.json({
        playlist: playlist,
      });
    }
  });
});

router.delete('/deletePlaylist', (req, res, next) => {
  const username = req.body.username;
  const playlistName = req.body.playlistName;
  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) return callback(err);
        else callback(null, user);
      });
    },
    function(user, callback) {
      const userId = user._id;
      Playlist.deleteOne({userId: userId, name: playlistName}, (err, success) => {
        if (err) {
          console.log(err);
          return callback(err);
        }
        else {
          console.log(success);
          callback(null, success);
        }
      });
    },
  ], function(err, success) {
    if (err) {
      console.log(err);
      return next(null, err);
    }
    else {
      console.log(success);
      return res.json({
        message: "Playlist successfully deleted",
      });
    }
  });
});


module.exports = router;
