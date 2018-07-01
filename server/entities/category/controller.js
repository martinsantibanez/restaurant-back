const Category = require('./model');
const Product = require('../product/model');

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    Category
    .find()
    .populate('products')
    .lean()
    .exec((error, result) => {
      if (error) { reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single category
 * @param  {String} category_id
 * @return {Promise}
 */
const getCategory = (category_id) => {
  // console.log(category_id);
  return new Promise((resolve, reject) => {
    Category
    .findById(category_id)
    .populate('products')
    .lean()
    .exec((error, result) => {
      if (error) { reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createCategory = (category) => {
  return new Promise((resolve, reject) => {
    const newCategory = new Category({
      name: category.name,
      show: category.show,
      products: []
    });

    newCategory.save((error) => {
      if(error) { reject(error); }
      else { resolve(newCategory); }
    });
  });
}
/**
 * 
 * @param {string} category_id 
 * @param {Category} category 
 */
const editCategory = (category_id, category) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndUpdate(category_id, category, (error, result) => {
      if(error) { reject(error); }
      else { resolve(result); }
    });
  });
}

/**
 * deletes a category
 * @param {string} category_id 
 */
const deleteCategory = (category_id) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndRemove(category_id, (error, result) => {
      if(error) { reject(error); }
      else { resolve(result); }
    });
  });
}

const addProductToCategory = (category_id, product_id) => {
  console.log(product_id);
  return new Promise((resolve, reject) => {
    Category.
    findById(category_id)
    .populate('products')
    .exec((error, category) => {
      if(error || !category) reject(error); 
      else
        Product.findById(product_id, (error, product) => {
          if(error || !product) reject(error);
          else {
            var match = category.products.find(e => e._id.equals(product._id));
            if(!match){
              category.products.push(product);
              category.save((error, updatedCategory) => {
                if(error) reject(error);
                else resolve(updatedCategory); 
              });
            } else {
              //TODO middleware for error handling
              const mierr = new Error("Already exists");
              mierr.httpStatusCode = 409;
              reject(mierr);
            } 
          }
        });

    });
  });
}
const removeProductFromCategory = (category_id, product_id) => {
  return new Promise((resolve, reject) => {
    Category
    .findById(category_id)
    .populate('products')
    .exec((error, category) => {
      if(error || !category) reject(error);
      else{
        //check that it IS in the category
        let match = null;
        for(let i=0 ; i < category.products.length ; i++)
          if(category.products[i]._id == product_id) match = i;
        if(match != null){
          category.products.splice(match, 1);
          category.save((error, updatedCategory) => {
            if(error) reject(error);
            else resolve(updatedCategory);
          });
        } else reject(new Error('Not in list'));
      }
    });
  });
}
module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
  addProductToCategory,
  removeProductFromCategory
};

