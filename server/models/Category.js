var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./Product.js');
var ProductSchema = mongoose.model('Product').schema;

var categorySchema = Schema({
    name: String,
    show: Boolean,
    products: [ProductSchema]
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;