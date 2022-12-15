const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/profile', (req, res, next) => {
  const username = req.query.username;
  User.findOne({email: username}, (err, user) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    else {
      console.log(user);
      return res.json({
        user: user,
      });
    }
  });
});

module.exports = router;
