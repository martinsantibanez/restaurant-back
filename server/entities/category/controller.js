const Category = require('./model');

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    Category
    .find()
    .populate('products')
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
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
      if (error) { console.log(error); reject(error); }
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
      if(error) { console.log(error); reject(error); }
      else { resolve(newCategory); }
    });
  });
}

const editCategory = (category_id, category) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndUpdate(category_id, category, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteCategory = (category_id) => {
  return new Promise((resolve, reject) => {
    Category
    .findByIdAndRemove(category_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory
};

