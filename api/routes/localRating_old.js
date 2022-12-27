const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/:id', (req, res, next) => {
  console.log("------------------------------------------------ GET");
  const mediaId = req.params.id;
  const username = req.query.username;
  User.findOne({email: username}, "localRatings", (err, user) => {
    if (err) return next(err);
    const localRatingsList = user?.localRatings;
    const localRating = localRatingsList?.length > 0 
      ? localRatingsList?.filter(rating => parseInt(rating?.id) === parseInt(mediaId))[0]
      : null;
    if (localRating) {
      console.log("GET localRating", localRating?.rating);
      return res.json({
        rating: localRating?.rating,
      });
    }
    return res.json({
      rating: null,
    });
  });
  
  // return res.json({
  //   rating: 0,
  // });
});

router.post('/:id', (req, res, next) => {
  console.log("------------------------------------------------ POST");
  const mediaId = parseInt(req.params.id);
  const username = req.body.username;
  const rating = req.body.rating;
  // const username = req.body.params.username;
  // const rating = req.body.params.rating;
  // console.log(req.body.params);
  console.log("POST rating: ", rating);
  User.findOne({email: username}, (err, user) => {
    if (err) {
      console.log("POST", err);
      return next(err);
    }
    try {
      console.log("POST", user);
      if(user?.localRatings?.length > 0 && user?.localRatings.filter(rating => rating?.id === mediaId).length > 0) {
        user.localRatings = user?.localRatings?.map(localRating =>
          (parseInt(localRating.id) === mediaId
            ? {...localRating, rating: rating}
            : localRating
          )
        );
      }
      else {
        user?.localRatings.push({id: mediaId, rating: rating});
      }
      user.save(err => {
        if(err) return next(err);
        return res.json({message: 'User saved successfully'});
      });
    } catch (e) {
      console.error("POST", e);
      return next(err);
    }
  });
});

module.exports = router;
