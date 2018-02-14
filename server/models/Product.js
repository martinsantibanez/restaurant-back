var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Ingredient = require('./Ingredient.js');
var IngredientSchema = mongoose.model('Ingredient').schema;


var productSchema = Schema({
    name: String,
    price: Number,
    description: String,
    recipe: [
      {
        ingredient: {type: Schema.Types.ObjectId, ref: 'Ingredient'},
        // ingredient: IngredientSchema,
        quantity: Number
      }
    ]
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;