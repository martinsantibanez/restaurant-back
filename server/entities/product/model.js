var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Ingredient = require('./Ingredient.js');


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


module.exports = mongoose.model('Product', productSchema);