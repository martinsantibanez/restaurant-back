var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = Schema({
    name: String,
    price: Number,
    description: String
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;