const Category = require('./model');

/**
 * get a single category
 * @param  {String} category_slug
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
      console.log("R: "+result);
      if (error) { console.log(error); reject(error); }
      else if (!result){ console.log("nulo"); reject(null); }
      else{
        console.log(result);
        resolve(result);
      }
    });
  });
};


module.exports = {
  getCategory,
};

