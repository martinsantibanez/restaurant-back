const getIngredient = require('./controller').getIngredient;
const getAllIngredients = require('./controller').getAllIngredients;
const createIngredient = require('./controller').createIngredient;
const editIngredient = require('./controller').editIngredient;
const deleteIngredient = require('./controller').deleteIngredient;

const productAPI = (app) => {
  //get all products
  app.get('/api/ingredients', (req, res) => {
    getAllIngredients().then(
      (result) => { res.send(result); },
      (error) => { res.status(500).send(error); }
    );
  })
  //get single Product
  app.get('/api/ingredients/:id', (req,res) => {
    getIngredient(req.params.id).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error); }
    );
  });
  //create new Product
  app.post('/api/ingredients', (req, res) => {
    createIngredient(req.body).then(
      (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
      (error) => { res.status(400).send({ created: false }); }
    );
  });
  //edit Product
  app.put('/api/ingredients/:id', (req, res) => {
    editIngredient(req.params.id, req.body).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error)}
    );
  });
  //remove Product
  app.delete('/api/ingredients/:id', (req, res) => {
    deleteIngredient(req.params.id, req.body).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error)}
    );
  });
};

module.exports = productAPI;
