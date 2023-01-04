const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
              // const token = jwt.sign({ user: body }, 'TOP_SECRET');
              const token = jwt.sign({ user: body }, 'TOP_SECRET', {expiresIn: 60*60*24});

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

router.post('/registerUser', async (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const age = req.body.age;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  console.log(req.body);

  User.find({email: username}, (err, user) => {
    if (err) {
      console.log(err);
      return res.json({
        user: false,
        error: {message: 'Failed to save'}
      });
    }
    else if (user) {
      if (user.length > 0) {
        return res.json({
          user: false,
          error: {email: 'Email is already in use. Try a different email.'}
        });
      }
      else {
        const userData = {
          email: username,
          first_name: firstName,
          last_name: lastName,
          country: country,
          age: age,
          newPassword: newPassword,
        }
        if (newPassword === confirmNewPassword) {
          console.log("passwords are the same");
          userData.password = newPassword;
          const user = new User(userData);
          user.save((err) => {
            if (err) {
              console.log("error on save user: ", err);
              return res.json({
                user: false,
                error: {
                  currentPassword: 'Failed to save',
                }
              });
            }
            else {
              console.log("success registering user");
              return res.json({
                user: true,
              });
            }
          });
        }
        else {
          console.log("passwords are not the same");
          return res.json({
            user: false,
            error: {confirmNewPassword: 'Passwords do not match.'}
          });
        }
      }
    }
  });
});


module.exports = router;
