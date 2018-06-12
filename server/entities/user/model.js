var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;