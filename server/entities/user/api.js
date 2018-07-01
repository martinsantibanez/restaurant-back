const express = require('express');
const router = express.Router();
const createUser = require('./controller').createUser;
const getAllUsers = require('./controller').getAllUsers;
const user = require('../../permission');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session: false}));

router.get('/users', user.is('admin'), (req, res) => {
  getAllUsers().then(
    (result) => { res.send(result); },
    (error) => { res.status(500).send(error); }
  );
})

router.post('/users', user.is('admin'), (req, res) => {
  createUser(req.body).then(
    (result) => { res.send(Object.assign({}, result._doc, { created: true })); },
    (error) => { console.log(error); res.status(400).send({ created: false }); }  )
});

module.exports = router;