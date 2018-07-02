const getTable = require('./controller').getTable;
const getAllTables = require('./controller').getAllTables;
const createTable = require('./controller').createTable;
const editTable = require('./controller').editTable;
const deleteTable = require('./controller').deleteTable;
const assignTable = require('./controller').assignTable;

const express = require('express');
const router = express.Router();
const passport = require('passport');
const user = require('../../permission');

router.use(passport.authenticate('jwt', {session: false}));

//get all tables
router.get('/tables', user.can('edit'), (req, res) => {
  getAllTables().then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(500).send(error); }
  );
})
//get single Table
router.get('/tables/:id', (req,res) => {
  getTable(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});
//create new Table
router.post('/tables', (req, res) => {
  createTable(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});
//open a Table and assign to current user
router.post('/tables/:id/open', (req, res) => {
  assignTable(req.params.id, req.user).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { res.status(400).send({ created: false }); }
  );
});

//edit Table
router.put('/tables/:id', (req, res) => {
  editTable(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error)}
  );
});
//remove Table
router.delete('/tables/:id', (req, res) => {
  deleteTable(req.params.id, req.body).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error) }
  );
});

module.exports = router;
