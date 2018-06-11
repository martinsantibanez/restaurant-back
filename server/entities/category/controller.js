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

const addProductToCategory = (category_id, product_id) => {
  console.log(product_id);
  return new Promise((resolve, reject) => {
    Category.findById(category_id, (error, category) => {
      if(error) reject(error); 
      else if(!category) reject(error);
      else {
        Product.findById(product_id, (error, product) => {
          if(error) reject(error);
          else if(!product){ console.log("nopo"); reject(error); }
          else {
            //check that it's not already in the category
            let match = false;
            for(let i = 0 ; i < category.products.length ; i++)
              if(category.products[i] == product_id)
                match = true;
            //if it's not, add it
            if(!match){
              category.products.push(product);
              category.save((error, updatedCategory) => {
                if(error) reject(error);
                else{ resolve(updatedCategory); }
              });
            } else reject(new Error("Already exists"));
          }
        });
      }
    });
  });
}

const editCategory = (category_id, category) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndUpdate(category_id, category, (error, result) => {
      if(error) { reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteCategory = (category_id) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndRemove(category_id, (error, result) => {
      if(error) { reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
  addProductToCategory
};

