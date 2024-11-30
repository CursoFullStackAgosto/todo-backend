const express = require('express');
const { getUsersController } = require('../controllers/user.controller');

const routes = express.Router();

routes.get('', getUsersController);

module.exports = {
    usersRouter: routes
}