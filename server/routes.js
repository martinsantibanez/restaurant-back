/**
 * module dependencies for routes configuration
 */
const path = require('path');
const express = require('express');
const categoryAPI = require('./entities/category/api');
const ingredientAPI = require('./entities/ingredient/api');
const productAPI = require('./entities/product/api');
const userAPI = require('./entities/user/api');

/**
 * routes configurations
 */
const routesConfig = (app) => {
  // serves static files from public directory
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));

  // serve api endpoint
  app.get('/api', (req, res) => {
    res.send('Hello from API endpoint');
  });


  // apply apis
  // categoryAPI(app);
  app.use('/admin', productAPI);
  app.use('/admin', categoryAPI);
  app.use('/admin', ingredientAPI);
  app.use('/api', userAPI);

  // all get request will send index.html for react-router
  // to handle the route request
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
  });
};

module.exports = routesConfig;
