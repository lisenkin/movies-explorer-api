const express = require('express');
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const notFoundRoute = require('./notFound');
const { login, createUser, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signUpValidation, signInValidation } = require('../middlewares/validation');

const route = express.Router();

route.post('/signin', signInValidation, login);
route.post('/signup', signUpValidation, createUser);

route.use(auth);

route.get('/signout', signOut);
route.use('/users', usersRoute);
route.use('/movies', moviesRoute);
route.use('*', notFoundRoute);

module.exports = route;
