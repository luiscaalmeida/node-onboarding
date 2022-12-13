const express = require('express');
const async = require('async');
const LocalRating = require('../models/localRating');
const User = require('../models/user');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  const mediaId = req.params.id;
  const username = req.query.username;

  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) {
          callback(err);
          return;
        }
        else {
          callback(null, user);
        }
      });
    },
    function(user, callback) {
      const userId = user._id;
      LocalRating.find({userId: userId, mediaId: mediaId}, "rating" , (err, ratings) => {
        if (err) {
          callback(err);
          return;
        }
        else {
          if (ratings.length === 0) callback(null, null);
          else callback(null, ratings[0].rating);
        }
      });
    },
  ], function(err, result) {
    if (err) {
      return next(err);
    }
    else {
      return res.json({
        rating: result,
      });
    }
  });
});


router.post('/:id', (req, res, next) => {
  const mediaId = parseInt(req.params.id);
  const username = req.body.username;
  const rating = req.body.rating;

  async.waterfall([
    function(callback) {
      User.findOne({email: username}, (err, user) => {
        if (err) {
          callback(err);
          return;
        }
        else callback(null, user);
      });
    },
    function(user, callback) {
      const userId = user._id;
      LocalRating.findOne({userId: userId, mediaId: mediaId}, (err, localRating) => {
        if (err) {
          callback(err);
          return;
        }
        else {
          if (!localRating) {
            const newRating = new LocalRating({
              userId: userId,
              mediaId: mediaId,
              rating: rating,
            });
            newRating.save(err => {
              if (err) {
                callback(err);
                return;
              }
              else callback(null, rating);
            });
          }
          else {
            if (localRating.rating !== rating){
              localRating.rating = rating;
              localRating.save(err => {
                if (err) {
                  callback(err);
                  return;
                }
                else callback(null, localRating.rating);
              });
            }
          }
        }
      });
    },
  ], function(err, result) {
    if (err) {
      return next(err);
    }
    else return res.json({message: 'User saved successfully'});
  });
});

module.exports = router;
