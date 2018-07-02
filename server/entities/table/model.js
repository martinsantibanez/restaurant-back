var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tableSchema = Schema({
  number: {type: Number, required: true},
  waiter: {type: Schema.Types.ObjectId, ref: 'User'},
  products: [{
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: Number
  }],
  status: String //AVAILABLE, OPEN, BILLED - TODO enum
});

tableSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Table', tableSchema);