const _ = require('lodash');
const bCrypt = require('bcrypt-nodejs');
const User = require('../user/model');

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

const _validPassword = (user, password) => {
  return bCrypt.compareSync(password, user.password);
};


module.exports = {
  authenticateUser
};
