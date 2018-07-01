const getCategory = require('./controller').getCategory;
const getAllCategories = require('./controller').getAllCategories;
const createCategory = require('./controller').createCategory;
const editCategory = require('./controller').editCategory;
const deleteCategory = require('./controller').deleteCategory;
const addProductToCategory = require('./controller').addProductToCategory;
const removeProductFromCategory = require('./controller').removeProductFromCategory;

const passport = require('passport');
const express = require('express');
const router = express.Router();
const user = require('../../permission');

router.use(passport.authenticate('jwt', {session: false}));

//get all categories
router.get('/categories', user.can('edit'), (req, res) => {
  getAllCategories().then(
    (result) => { res.send(result); },
    (error) => { res.status(500).send(error); }
  );
})
//get single category
router.get('/categories/:id', (req,res) => {
  getCategory(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new category
router.post('/categories', (req, res) => {
  createCategory(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});
//edit category
router.put('/categories/:id', (req, res) => {
  editCategory(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//remove category
router.delete('/categories/:id', (req, res) => {
  deleteCategory(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//get products in category
router.get('/categories/:id/products', (req, res) => {
  getCategory(req.params.id).then(
    (result) => { res.send(result.products) },
    (error) => { res.status(400).send(error); }
  );
});
//add a product to category. Body should be {id: product_id}
router.post('/categories/:id/products', (req, res) => {
  addProductToCategory(req.params.id, req.body.id).then(
    (result) => { res.send(result); },
    (error) => { 
      //TODO do this elsewhere
      console.log(error);
      if(error.httpStatusCode)
        res.status(error.httpStatusCode);
      else
        res.status(500);
      res.send(error); 
    }
  );
});
//remove a product from category.
router.delete('/categories/:id/products/:product_id', (req, res) => {
  removeProductFromCategory(req.params.id, req.params.product_id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});

module.exports = router;
