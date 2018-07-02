const bCrypt = require('bcrypt-nodejs');
const User = require('./model');

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    // find a user in Mongo with provided username
    
    User.findOne({'email': user.email}, function(err, foundUser) {
      // In case of any error return
      if (err){
        console.log('Error in SignUp: '+err);
        reject(err);
      }
      // already exists
      if (foundUser) {
        console.log('User already exists');
        return reject(new Error('User Already Exists'));
      } else {
        // if there is no user with that email
        // create the user
        var newUser = new User();
        // set the user's local credentials
        newUser.email = user.email;
        newUser.password = _createHash(user.password);
        newUser.name = user.name;
        newUser.role = user.role;

        // save the user
        newUser.save(function(err) {
          if (err){
            console.log('Error in Saving user: '+err);  
            throw err;  
          }
          console.log('User Registration succesful');    
          resolve(newUser);
        });
      }
    });
  });
}

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.
    findById(id)
    .select('-password')
    .exec((err, res) => {
      if(err) reject(err);
      else {

        resolve(res);
      }
    });
  });
}
const editUser = (user_id, editedUser) => {
  return new Promise((resolve, reject) => {
    User.findById(user_id)
    .select('-password') //TODO PASSWORD CHANGE ENDPOINT
    .exec((error, user) => {
      if(error || !user) reject(error);
        user.email = editedUser.email;
        // user.password = _createHash(editedUser.password); TODO
        user.name = editedUser.name;
        user.role = editedUser.role;
        user.save((error, updatedUser) => {
          if(error) reject(error);
          else resolve(updatedUser);
        });
    });
  });
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User
    .find()
    .select('-password')
    .populate('tables')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

const deleteUser = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(user_id, (error, result) => {
      if(error) reject(error);
      else resolve(result);
    })
  });
}

const _createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {
  createUser,
  getAllUsers,
  editUser,
  getUser,
  deleteUser,
}