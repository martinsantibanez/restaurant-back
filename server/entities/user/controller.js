const _ = require('lodash');
const asyncEach = require('async/each');
const bCrypt = require('bcrypt-nodejs');
const User = require('./model');

const authenticateUser = (email, password, done) => {
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!_validPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
};

const registerUser = (req, email, password, done) => {
  // find a user in Mongo with provided username
  User.findOne({'email':email}, function(err, user) {
    // In case of any error return
    if (err){
      console.log('Error in SignUp: '+err);
      return done(err);
    }
    // already exists
    if (user) {
      console.log('User already exists');
      return done(null, false, 
          req.flash('message','User Already Exists'));
    } else {
      // if there is no user with that email
      // create the user
      var newUser = new User();
      // set the user's local credentials
      newUser.email = email;
      newUser.password = _createHash(password);
      newUser.firstName = req.params.firstName;
      newUser.lastName = req.params.lastName;

      // save the user
      newUser.save(function(err) {
        if (err){
          console.log('Error in Saving user: '+err);  
          throw err;  
        }
        console.log('User Registration succesful');    
        return done(null, newUser);
      });
    }
  });
}

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.
    findById(id, (err, res) => {
      if(err) reject(err);
      else {
        resolve(res);
      }
    });
  });
}

const _validPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};

const _createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {
  authenticateUser,
  registerUser,
  getUser
};
