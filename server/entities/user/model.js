var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        /*TODO select: false*/
    },
    role: String,
    name: {
        type: String,
        required: true
    }
});

userSchema.virtual('tables', {
    ref: 'Table',
    localField: '_id',
    foreignField: 'waiter'
});

var User = mongoose.model('User', userSchema);

module.exports = User;