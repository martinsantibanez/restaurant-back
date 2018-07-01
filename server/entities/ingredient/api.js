const getIngredient = require('./controller').getIngredient;
const getAllIngredients = require('./controller').getAllIngredients;
const createIngredient = require('./controller').createIngredient;
const editIngredient = require('./controller').editIngredient;
const deleteIngredient = require('./controller').deleteIngredient;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../../permission');

router.use(passport.authenticate('jwt', {session: false}));

//get all products
router.get('/ingredients', user.can('edit'), (req, res) => {
  getAllIngredients().then(
    (result) => { res.send(result); },
    (error) => { res.status(500).send(error); }
  );
})
//get single Product
router.get('/ingredients/:id', (req,res) => {
  getIngredient(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Product
router.post('/ingredients', (req, res) => {
  createIngredient(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});
//edit Product
router.put('/ingredients/:id', (req, res) => {
  editIngredient(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Product
router.delete('/ingredients/:id', (req, res) => {
  deleteIngredient(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

module.exports = router;
