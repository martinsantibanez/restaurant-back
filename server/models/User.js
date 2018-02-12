var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    age: Number
});

var User = mongoose.model('User', userSchema);

module.exports = User;