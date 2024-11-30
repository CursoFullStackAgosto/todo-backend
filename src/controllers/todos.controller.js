const { connectDb } = require("../config/db");
const { getTodos, createTodo, updateTodo, getTodoById, deleteTodo } = require("../models/todo.model");

const getAllTodosController = async (request, response) => {
    try {
        const todos = await getTodos();

        if (todos.length === 0) {
            return response.status(404).json({
                status: 'Not found',
                message: 'No se encontro ninguna tarea.'
            })
        }

        response.status(200).json(todos);
    } catch (error) {
        console.error('Error al obtener los todos.', error)

        response.status(500).json({
            status: 'error',
            message: 'Error al obtener las tareas.'
        })
    }
}

const createTodoController = async (request, response) => {
    const { description, completed, userId } = request.body
    const newTodo = await createTodo(description, completed, userId);
    response.status(201).json(newTodo);
}

const updateTodoController = async (request, response) => {
    try {
        const { id: todoId } = request.params;
        const { completed, description } = request.body

        const currentTodo = await getTodoById(todoId);

        const updatedTodo = await updateTodo(
            todoId, 
            completed ?? currentTodo.completed, 
            description ? description :  todo.description
        );
    
        response.status(200).json(updatedTodo)
    } catch (error) {
        console.error(error)
        response.status(500).json({
            status: 'error',
            message: 'Error al actualizar.'
        })
    }
}

const deleteTodoController = async (request, response) => {
    try {
        const { id: todoId } = request.params;
        
        const deletedTodo = await deleteTodo(todoId)

        if (deletedTodo.length === 0) {
            return response.status(404).json({
                status: 'Not found',
                message: 'Todo no encontrado'
            })
        }

        response.status(204).send();
    } catch (error) {
        console.error(error);
        response.status(500).json({
            status: 'error',
            message: 'Error al eliminar.'
        })
    }
}

module.exports = {
    getAllTodosController,
    createTodoController,
    updateTodoController,
    deleteTodoController
}