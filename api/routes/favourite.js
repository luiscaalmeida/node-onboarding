const express = require('express');
const Movies = require('../models/movies');
const Tvseries = require('../models/tvseries');
const User = require('../models/user');
const router = express.Router();

router.get('/movies', (req, res, next) => {
  const favouriteMovies = User.find();
  console.log(favouriteMovies);
  res.json({
    message: 'You made it to the secure route',
  })
})

// router.post()
// router.post()

module.exports = router;
