/**
 * module dependencies for passport configuration
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;

const serverConfig = require('../config/serverConfig');
// controllers
const getUser = require('./entities/user/controller').getUser;
const authenticateUser = require('./entities/user/controller').authenticateUser;
const registerUser = require('./entities/user/controller').registerUser;

const user = require('./permission');
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
  ));
  
  passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey : serverConfig.SECRET,
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
  }, (token, done) => {
    return done(null, token.user);
  }));

   //permissions
  user.use('edit', function (req) {
    if (req.user.role === 'admin') {
      return true;
    }
  });
  
  app.use(user.middleware());


};

module.exports = passportConfig;
