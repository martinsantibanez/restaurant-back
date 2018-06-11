const Product = require('./model');

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    Product
    .find()
    .populate('recipe.ingredient')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single product
 * @param  {String} product_id
 * @return {Promise}
 */
const getProduct = (product_id) => {
  // console.log(product_id);
  return new Promise((resolve, reject) => {
    Product
    .findById(product_id)
    .populate('recipe.ingredient')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = new Product({
      name: product.name,
      price: product.price,
      description: product.description,
      recipe: []
    });

    newProduct.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newProduct); }
    });
  });
}

const editProduct = (product_id, product) => {
  return new Promise((resolve, reject) => {
    Product
    .findByIdAndUpdate(product_id, product, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteProduct = (product_id) => {
  return new Promise((resolve, reject) => {
    Product
    .findByIdAndRemove(product_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
}