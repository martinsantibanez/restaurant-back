const getProduct = require('./controller').getProduct;
const getAllProducts = require('./controller').getAllProducts;
const createProduct = require('./controller').createProduct;
const editProduct = require('./controller').editProduct;
const deleteProduct = require('./controller').deleteProduct;

const productAPI = (app) => {
  //get all products
  app.get('/api/products', (req, res) => {
    getAllProducts().then(
      (result) => { res.send(result); },
      (error) => { res.status(500).send(error); }
    );
  })
  //get single Product
  app.get('/api/products/:id', (req,res) => {
    getProduct(req.params.id).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error); }
    );
  });
  //create new Product
  app.post('/api/products', (req, res) => {
    createProduct(req.body).then(
      (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
      (error) => { res.status(400).send({ created: false }); }
    );
  });
  //edit Product
  app.put('/api/products/:id', (req, res) => {
    editProduct(req.params.id, req.body).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error)}
    );
  });
  //remove Product
  app.delete('/api/products/:id', (req, res) => {
    deleteProduct(req.params.id, req.body).then(
      (result) => { res.send(result); },
      (error) => { res.status(400).send(error)}
    );
  });
};

module.exports = productAPI;
