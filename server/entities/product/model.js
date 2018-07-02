var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    price: Number,
    description: String,
    recipe: [
      {
        ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
        quantity: Number
      }
    ]
});
productSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('Product', productSchema);