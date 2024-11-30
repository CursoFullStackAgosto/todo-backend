const { connectDb } = require("../config/db");

const getTodos = async () => {
    const result = await connectDb.query('SELECT * FROM todos');
    return result.rows
}

const createTodo = async (description, completed, userId) => {
    const result = await connectDb.query(
        'INSERT INTO todos (description, completed, user_id) VALUES ($1, $2, $3) RETURNING id, description, completed',
        [description, completed, userId])
    return result.rows[0]
}

const getTodoById = async (todoId) => {
    const result = await connectDb.query(
        'SELECT * FROM todos WHERE id = $1',
        [todoId]
    );

    return result.rows[0]
}

const updateTodo = async (todoId, completed, description) => {
    const result = await connectDb.query(
        'UPDATE todos ' +  // Tabla donde quiero actualizar
        'SET completed = $1, description = $2 ' + // Datos/Campos que quiero que se actualizen
        'WHERE id = $3 ' + // Registro donde quiero que sea actualize
        'RETURNING id, description, completed', // Al finalizar la actualizacion los datos que quiero que me devuelva/retorne
        [completed, description, todoId]);

    return result.rows[0];
}

const deleteTodo = async (todoId) => {
    const result = await connectDb.query('DELETE FROM todos WHERE id = $1 RETURNING *', [todoId]);
    return result.rows
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    getTodoById,
    deleteTodo
}