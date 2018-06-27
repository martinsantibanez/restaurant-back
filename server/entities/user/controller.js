const bCrypt = require('bcrypt-nodejs');
const User = require('./model');
const addUser = (req, email, password, done) => {
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

const getAllUsers = (req, res) => {
  return new Promise((resolve, reject) => {
    User
    .find()
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

const _createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {
  addUser,
  getAllUsers
}