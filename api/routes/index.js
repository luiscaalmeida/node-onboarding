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

// router.post(
//   '/logout',
//   passport.authenticate('logout', {session: false}),
//   async (req, res, next) => {
//     req.logout(err => {
//       if (err) { 
//         console.log(err);
//         return next(err); 
//       }
//       res.redirect('/');
//     });
//   }
// );

router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');
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
          return next(error);
        }
      }
    )(req, res, next);
  }
);


module.exports = router;
