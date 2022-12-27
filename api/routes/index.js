const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post(
  '/signup',
  passport.authenticate('signup', {session: false}),
  async (req, res, next) => {
    res.json({
      message: 'Signup successfull',
      user: req.user,
    });
  },
);

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            console.log("User: ", user);
            console.log("Err: ", err);
            const error = new Error('An error occurred during login.');
            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) {
                return next(error);
              }

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          console.log(error);
          return next(error);
        }
      }
    )(req, res, next);
  }
);


module.exports = router;
