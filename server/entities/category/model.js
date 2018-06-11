var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Product = require('./Product.js');
// var ProductSchema = mongoose.model('Product').schema;

var categorySchema = Schema({
    name: {
      type: String,
      required: [true, 'Name is required']
    },
    show: Boolean,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('Category', categorySchema);