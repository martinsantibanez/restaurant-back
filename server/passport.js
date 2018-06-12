/**
 * module dependencies for passport configuration
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// controllers
const getUser = require('./entities/user/controller').getUser;
const authenticateUser = require('./entities/user/controller').authenticateUser;
const registerUser = require('./entities/user/controller').registerUser;

/**
 * passport configuration
 */
const passportConfig = (app) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
    
  passport.deserializeUser((id, done) => {
    getUser(id).then(
      (user) => { done(null, user); },
      (error) => { done(error); }
    );
  });
  passport.use(new LocalStrategy(
    {usernameField: 'email',},
    authenticateUser
  ));
  passport.use('signup', new LocalStrategy(
    {usernameField: 'email', passReqToCallback: true},
    registerUser
  ))
};

module.exports = passportConfig;
