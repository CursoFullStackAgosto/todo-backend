const express = require('express');
const { getUsersController } = require('../controllers/user.controller');
const { registerController, loginController } = require('../controllers/auth.controller');

const routes = express.Router();

routes.get('', getUsersController);
routes.post('/register', registerController)
routes.post('/login', loginController)

module.exports = {
    usersRouter: routes
}