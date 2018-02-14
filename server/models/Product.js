var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    description: String,
    recipe: [
      {
        ingredient: {type: Schema.Types.ObjectId, ref: 'Tag'},
        quantity: Number
      }
    ]
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;