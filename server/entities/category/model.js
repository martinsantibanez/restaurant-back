var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    show: Boolean,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

//TODO: products virtual

categorySchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Category', categorySchema);