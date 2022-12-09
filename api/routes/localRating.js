const express = require('express');
const Favourites = require('../models/favourites');
const User = require('../models/user');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  console.log("------------------------------------------------ GET");
  const mediaId = req.params.id;
  const username = req.query.username;
  User.findOne({email: username}, "localRatings", (err, user) => {
    if (err) return next(err);
    const localRatingsList = user?.localRatings;
    const localRating = localRatingsList?.length > 0 ? localRatingsList?.filter(rating => parseInt(rating?.id) === parseInt(mediaId))[0] : null;
    if (localRating) {
      console.log("GET localRating", localRating);
      res.json({
        rating: localRating?.rating,
      });
    }
  });
  
  res.json({
    rating: 0,
  });
});

router.post('/:id', (req, res, next) => {
  console.log("------------------------------------------------ POST");
  const mediaId = req.params.id;
  const username = req.body.params.username;
  const rating = req.body.params.rating;
  console.log("POST", req.body.params);
  // const {username, rating} = req.query;
  User.findOne({email: username}, (err, user) => {
    if (err) {
      console.log("POST", err);
      return next(err);
    }
    try {
      console.log("POST", user);
      user?.localRatings.push({id: mediaId, rating: rating});
      console.log("POST AFTER", user);
      user.save();
      console.log("POST AFTER AFTER", user);
    } catch (e) {
      console.error("POST", e);
      return next(err);
    }
  });
});

module.exports = router;
