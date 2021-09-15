const express = require('express');

const usersRoute = express.Router();
const { updateUserData, getCurrentUser } = require('../controllers/users');
const { userDataValidation } = require('../middlewares/validation');

usersRoute.get('/me', getCurrentUser);

usersRoute.patch('/me', userDataValidation, updateUserData);

module.exports = usersRoute;
