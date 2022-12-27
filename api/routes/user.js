const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

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


router.post('/updateUser', async (req, res, next) => {
  const username = req.body.username;
  const newUsername = req.body.newUsername;
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  console.log(req.body);
  User.findOne({email: username}, async (err, user) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    else {
      let response = {
        user: false,
      };
      if (newUsername && (username !== newUsername)) {
        console.log("trocando username");
        user.email = newUsername;
      }
      if (currentPassword && newPassword && confirmNewPassword) {
        const validate = await user.isValidPassword(currentPassword);
        console.log(validate);
        if (!validate) {
          console.log("incorrect password");
          response = {
            ...response,
            error: {
              currentPassword: 'Current Password is not correct.'
            }
          };
        }
        else {
          console.log("correct password");

          if (newPassword === confirmNewPassword) {
            console.log("passwords are the same");
            user.password = newPassword;
          }
          else {
            response = {
              ...response,
              error: {
                confirmNewPassword: 'Passwords do not match.'
              }
            };
          }
        }
      }
      user.save((err) => {
        if (err) {
          console.log("erro: ", err);
          return res.json({
            ...response,
            error: {
              currentPassword: 'Failed to save',
            }
          });
        }
        else {
          console.log("success");
          return res.json({
            ...response,
            user: true,
          });
        }
      });
    }
  });
});

router.post('/registerUser', async (req, res, next) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const age = req.body.age;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  console.log(req.body);
  User.findOne({email: username}, async (err, user) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    else {
      let response = {
        user: false,
      };
      user.email = username;
      user.first_name = firstName;
      user.last_name = lastName;
      user.country = country;
      user.age = age;
      user.newPassword = newPassword;
      user.email = newUsername;
      if (newPassword === confirmNewPassword) {
        console.log("passwords are the same");
        user.password = newPassword;
        response = {...response, user: true};
      }
      else {
        console.log("passwords are not the same");
        response = {
          ...response,
          error: {confirmNewPassword: 'Passwords do not match.'}
        };
      }
      user.save((err) => {
        if (err) {
          console.log("erro: ", err);
          return res.json({
            ...response,
            error: {
              currentPassword: 'Failed to save',
            }
          });
        }
        else {
          console.log("success registering user");
          return res.json({
            ...response,
            user: true,
          });
        }
      });
    }
  });
});

router.put('/profile', (req, res, next) => {
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
