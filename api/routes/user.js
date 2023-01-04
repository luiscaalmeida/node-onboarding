const express = require('express');
const User = require('../models/user');
const router = express.Router();
const fs = require('fs');

router.get('/isLoggedIn', (req, res, next) => {
  console.log(req?.user);
  return res.json({
    user: req?.user ? req?.user?.email : false,
  });
});


router.get('/profile', (req, res, next) => {
  User.findOne({email: req.user.email}, (err, user) => {
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

router.put('/profile', (req, res, next) => {
  User.findOne({email: req.user.email}, (err, user) => {
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


router.post('/updateUserInformation', async (req, res, next) => {
  const newUsername = req.body.newUsername;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const country = req.body.country;
  const age = req.body.age;
  const updatedUserInformation = {email: newUsername, first_name: firstName, last_name: lastName, country, age };
  User.findOneAndUpdate({email: req.user.email}, updatedUserInformation, {new: true}, async (err, doc) => {
    if (err) {
      console.log(err)
      return res.json({
        user: false,
        error: {
          currentPassword: 'Failed to save',
        }
      });
    }
    else {
      console.log("success");
      console.log(doc);
      return res.json({
        user: true,
      });
    }
  });
});


router.post('/updateUserPassword', async (req, res, next) => {
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;

  User.findOne({email: req.user.email}, async (err, user) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    else {
      if (currentPassword && newPassword && confirmNewPassword) {
        const validate = await user.isValidPassword(currentPassword);
        console.log(validate);
        if (!validate) {
          console.log("incorrect password");
          return res.json({
            user: false,
            error: {currentPassword: 'Current Password is not correct.'}
          });
        }
        else {
          console.log("correct password");

          if (newPassword === confirmNewPassword) {
            console.log("passwords are the same");
            user.password = newPassword;
            user.save((err) => {
              if (err) {
                console.log("erro: ", err);
                return res.json({
                  user: false,
                  error: {currentPassword: 'Failed to save'}
                });
              }
              else {
                console.log("success");
                return res.json({
                  user: true,
                });
              }
            });
          }
          else {
            return res.json({
              user: false,
              error: {confirmNewPassword: 'Passwords do not match.'}
            });
          }
        }
      }
      else {
        return res.json({
          user: false,
          error: {message: 'Failed to save'}
        });
      }
    }
  });
});



router.post("/updateUserPhoto", async (req, res, next) => {
  try {
    if (!req.files) {
      return res.json({
        error: {message: 'Failed to save'}
      });
    } else {
      console.log(req.files);
      let file = req.files.file;
      let filePath = `./public/images/${file.name}`;
      console.log(filePath);
      file.mv(filePath);

      User.findOne({email: req.user.email}, (err, user) => {
        if (err) {
          console.log(err);
          return res.json({
            user: false,
            error: {message: 'Failed to save photo'},
          });
        }
        else {
          try {
            user.photo = file.name;
            user.save(err => {
              if(err) {
                console.log(err);
                return next(err);
              }
              return res.json({
                user: true,
                message: `Picture "${file.name}" saved successfully`,
              });
            });
          } catch (err) {
            console.log(err);
            return res.json({
              user: false,
              error: {message: 'Failed to save photo'},
            });
          }
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});




module.exports = router;
