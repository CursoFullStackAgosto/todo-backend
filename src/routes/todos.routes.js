const express = require('express');

const { 
    getAllTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController
} = require('../controllers/todos.controller');

const routes = express.Router();

routes.get('', getAllTodosController);
routes.post('', createTodoController);
routes.put('/:id', updateTodoController);
routes.delete('/:id', deleteTodoController);

module.exports = {
    todosRouter: routes
}