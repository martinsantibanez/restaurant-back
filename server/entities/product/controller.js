const Product = require('./model');
const Ingredient = require('../ingredient/model');

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

/**
 * 
 * @param {id} product_id 
 * @param {ingredient: id, quantity: number} element 
 */
const addIngredientToRecipe = (product_id, element) => {
  return new Promise((resolve, reject) => {
    Product.findById(product_id)
    .populate('recipe.ingredient')
    .exec((error, product) => {
      if(error || !product) reject(error); 
      else
        Ingredient.findById(element.ingredient, (error, ingredient) => {
          if(error || !ingredient) reject(error);
          else {
            //check that it's not already in the product
            var match = product.recipe.find(e => e.ingredient._id.equals(ingredient._id) );
            if(!match){
              product.recipe.push({ingredient: ingredient, quantity: element.quantity});
              product.save((error, updatedProduct) => {
                if(error) reject(error);
                else resolve(updatedProduct);
              });
            } else reject(new Error("Already exists")); 
          }
        });
      
    })
  })
}

const removeIngredientFromRecipe = (product_id, item_id) => {
  return new Promise((resolve, reject) => {
    Product.findById(product_id)
    .populate('recipe.ingredient')
    .exec((error, product) => {
      if(error || !product) reject(error);
      else {
        var item = product.recipe.id(item_id);
        if(item){
          item.remove();
          product.save((error, updatedProduct) => {
            if(error) reject(error);
            else resolve(updatedProduct)
          });
        } else {
          reject(new Error('wrong'));
        }
      
      }
    });
  });
}

const editRecipeItem = (product_id, item_id, element) => {
  return new Promise((resolve, reject) => {
    Product.findById(product_id, (error, product) => {
      if(error || !product) reject(error);
      else {
        var item = product.recipe.id(item_id);
        if(item){
          item.quantity = element.quantity;
          product.save((error, updatedProduct) => {
            if(error) reject(error);
            else resolve(updatedProduct);
          });
        } else {
          reject(new Error('wrong'));
        }
      }
    });
  });
}


module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  addIngredientToRecipe,
  removeIngredientFromRecipe,
  editRecipeItem
}