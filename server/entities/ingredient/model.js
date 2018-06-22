var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    stock: Number,
    unit: String
});
ingredientSchema.pre('findOneAndUpdate', function(next) {
  this.options.runValidators = true;
  next();
});
var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;