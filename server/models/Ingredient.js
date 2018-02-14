var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ingredientSchema = Schema({
    name: String,
    stock: Number,
    unit: String
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;