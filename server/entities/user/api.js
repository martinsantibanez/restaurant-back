const express = require('express');
const router = express.Router();
const createUser = require('./controller').createUser;
const getUser = require('./controller').getUser;
const getAllUsers = require('./controller').getAllUsers;
const editUser = require('./controller').editUser;
const deleteUser = require('./controller').deleteUser;
const user = require('../../permission');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/users', user.is('admin'), (req, res) => {
  getAllUsers().then(
    (result) => { res.send(result); },
    (error) => { res.status(500).send(error); }
  );
});

router.post('/users', user.is('admin'), (req, res) => {
  createUser(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { console.log(error); res.status(400).send({ created: false }); }  )
});

router.get('/users/:id', (req, res) => {
  getUser(req.params.id).then(
    (result) => { res.send(result); },
    (error) => { res.status(400).send(error); }
  );
});

router.put('/users/:id', user.is('admin'), (req, res) => {
  editUser(req.params.id, req.body).then(
    (result) => res.send(result),
    (error) => res.status(400).send(error)
  );
});

router.delete('/users/:id', user.is('admin'), (req, res) => {
  deleteUser(req.params.id).then(
    (result) => res.send(result),
    (error) => res.status(400).send(error)
  );
});

module.exports = router;