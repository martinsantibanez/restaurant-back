const Ingredient = require('./model');

const getAllIngredients = () => {
  return new Promise((resolve, reject) => {
    Ingredient
    .find()
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    })
  })
}

/**
 * get a single ingredient
 * @param  {String} ingredient_id
 * @return {Promise}
 */
const getIngredient = (ingredient_id) => {
  // console.log(ingredient_id);
  return new Promise((resolve, reject) => {
    Ingredient
    .findById(ingredient_id)
    .lean()
    .exec((error, result) => {
      if (error) { console.log(error); reject(error); }
      else if (!result) { console.log("nulo"); reject(null); }
      else { resolve(result); }
    });
  });
};

const createIngredient = (ingredient) => {
  return new Promise((resolve, reject) => {
    const newIngredient = new Ingredient({
      name: ingredient.name,
      stock: ingredient.stock,
      unit: ingredient.unit
    });

    newIngredient.save((error) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(newIngredient); }
    });
  });
}

const editIngredient = (ingredient_id, ingredient) => {
  return new Promise((resolve, reject) => {
    Ingredient
    .findByIdAndUpdate(ingredient_id, ingredient, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

const deleteIngredient = (ingredient_id) => {
  return new Promise((resolve, reject) => {
    Ingredient
    .findByIdAndRemove(ingredient_id, (error, result) => {
      if(error) { console.log(error); reject(error); }
      else { resolve(result); }
    });
  });
}

module.exports = {
  getAllIngredients,
  getIngredient,
  createIngredient,
  editIngredient,
  deleteIngredient
}