const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");


mongoose.connect('mongodb://localhost/onboarding-node-users', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

require('./auth/auth');

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

const indexRouter = require('./routes/index');
const userRoutes = require('./routes/user');
const playlistRouter = require('./routes/playlist');
const localRatingRouter = require('./routes/localRating');

const app = express();

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(fileUpload({createParentPath: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/playlist', passport.authenticate('jwt', { session: false }), playlistRouter);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes);
app.use('/localRating', passport.authenticate('jwt', { session: false }), localRatingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log("MAIN ERROR: ", err);
  res.status(err.status || 500);
  return res.send('error: app.js');
});

module.exports = app;
