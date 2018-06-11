const getCategory = require('./controller').getCategory;

const categoryAPI = (app) => {
  //get single category
  app.get('/api/categories/:id', (req,res) => {
    const category_id = req.params.id;
    getCategory(category_id).then(
      (result) => { res.json(result); console.log(result); },
      (error) => { res.send(error); }
    );

  });
};

module.exports = categoryAPI;
