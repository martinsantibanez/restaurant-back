const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

//Models
var User = require('../models/User.js');
var Product = require('../models/Product.js');
var Category = require('../models/Category.js');

//DB
const url = 'mongodb://localhost:27017';
const dbName = 'mean';

//Mongoose
mongoose.connect(url + '/' + dbName);

const connection = (closure) => {
    return MongoClient.connect(url, (err, client) => {
        assert.equal(null, err);
        console.log("Conectado.");
        const db = client.db(dbName);
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// Get users
router.get('/users', (req, res) => {
    User.find((err, users) => {
        if(err) return next(err);
        response.data = users;
        res.json(response);
    });
});

router.get('/users/:id', (req, res, next) => {
    User.findById(req.params.id, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

//Categories
router.get('/categories', (req, res, next) => {
    Category.find((err, categories) => {
        if(err) return next(err);
        response.data = categories;
        res.json(response.data);
    })
});

router.post('/categories', (req,res,next) => {
    Category.create(req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    })
});

router.get('/categories/:id', (req,res,next) => {
    Category.findById(req.params.id, (err, cat) => {
        if(err) return next(err);
        res.json(cat);
    });
});

router.put('/categories/:id', function(req, res, next) {
    Category.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

router.delete('/categories/:id', function(req, res, next) {
    Category.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

////
//Products
router.get('/products', (req, res, next) => {
    Product.find((err, products) => {
        if(err) return next(err);
        response.data = products;
        res.json(response.data);
    })
});

router.post('/products', (req,res,next) => {
    Product.create(req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    })
});

router.get('/products/:id', (req,res,next) => {
    Product.findById(req.params.id, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

router.put('/products/:id', function(req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

router.delete('/products/:id', function(req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, (err, post) => {
        if(err) return next(err);
        res.json(post);
    });
});

////
module.exports = router;