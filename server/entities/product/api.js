const getProduct = require('./controller').getProduct;
const getAllProducts = require('./controller').getAllProducts;
const createProduct = require('./controller').createProduct;
const editProduct = require('./controller').editProduct;
const deleteProduct = require('./controller').deleteProduct;
const addIngredientToRecipe = require('./controller').addIngredientToRecipe;
const removeIngredientFromRecipe = require('./controller').removeIngredientFromRecipe;
const editRecipeItem = require('./controller').editRecipeItem;

const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
  getAllProducts().then(
    (result) => { res.send(result); },
    (error) => { res.status(500).send(error); }
  );
})
//get single Product
router.get('/products/:id', (req,res) => {
  getProduct(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Product
router.post('/products', (req, res) => {
  createProduct(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});
//edit Product
router.put('/products/:id', (req, res) => {
  editProduct(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Product
router.delete('/products/:id', (req, res) => {
  deleteProduct(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//get recipe of a product
router.get('/products/:id/recipe', (req, res) => {
  getProduct(req.params.id).then(
    (result) => { res.send(result.recipe) },
    (error) => { res.status(400).send(error); }
  );
});
//add an ingredient to a recipe.
router.post('/products/:id/recipe', (req, res) => {
  addIngredientToRecipe(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//remove an ingredient from a recipe
router.delete('/products/:id/recipe/:item_id', (req,res) => {
  removeIngredientFromRecipe(req.params.id, req.params.item_id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//edit a recipe element
router.put('/products/:id/recipe/:item_id', (req,res) => {
  editRecipeItem(req.params.id, req.params.item_id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});

module.exports = router;
