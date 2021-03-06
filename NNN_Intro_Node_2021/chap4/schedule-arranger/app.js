// [ import library ]
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');

// [ import model ]
var User = require('./models/user');
var Schedule = require('./models/schedule');
var Availability = require('./models/availability');
var Candidate = require('./models/candidate');
var Comment = require('./models/comment');

// [ create database ]
User.sync().then(() => {
  Schedule.belongsTo(User, { foreignKey: 'createdBy' });
  Schedule.sync();
  Comment.belongsTo(User, { foreignKey: 'userId' });
  Comment.sync();
  Availability.belongsTo(User, { foreignKey: 'userId' });
  Candidate.sync().then(() => {
    Availability.belongsTo(Candidate, { foreignKey: 'candidateId' });
    Availability.sync();
  });
});

// [ GitHub Authentication ]
var GitHubStrategy = require('passport-github2').Strategy;
var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '1485fa564995b5f764cd';
var GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '145a5f2bfbf5c67655dd0996099a91a630470943';

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
passport.use(new GitHubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: process.env.HEROKU_URL ? process.env.HEROKU_URL + 'auth/github/callback' : 'http://localhost:8000/auth/github/callback'
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
       User.upsert({
        userId: profile.id,
        username: profile.username
      }).then(() => {
        done(null, profile);
      });
    });
  }
));

// [ import router ]
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var schedulesRouter = require('./routes/schedules');
var availabilitiesRouter = require('./routes/availabilities')
var commentsRouter = require('./routes/comments');

// [ Express ]
var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// prepare auth (passport)
app.use(session({
  secret: '52b8d243bf127a3c',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/schedules', schedulesRouter);
app.use('/schedules', availabilitiesRouter);
app.use('/schedules', commentsRouter);

// github auth
app.get('/auth/github',
  passport.authenticate('github', { scope: 'user:email' }),
  function (req, res) {
});
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    var loginFrom = req.cookies.loginFrom;
    if (loginFrom && loginFrom.startsWith('/')) {
      res.clearCookie('loginFrom');
      res.redirect(loginFrom);
    } else {
      res.redirect('/');
    }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// [ export module ]
module.exports = app;