const passport = require('passport');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const serverConfig = require('../../../config/serverConfig');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    try {
      if(err || !user){
        const error = new Error('An Error occured')
        return next(error);
      }
      req.login(user, { session : false }, (error) => {
        if( error ) return next(error)
        //We don't want to store the sensitive information such as the
        //user password in the token so we pick only the email and id
        const body = { _id : user._id, email : user.email, role: user.role };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user : body }, serverConfig.SECRET);
        //Send back the token to the user
        return res.json({ token });
      });   
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  //We'll just send back the user details and the token
  res.json({
    message : 'You made it to the secure route',
    user : req.user,
    token : req.query.secret_token
  });
});

module.exports = router;
