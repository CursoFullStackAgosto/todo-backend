require('dotenv').config()

const express = require('express');
const { connectDb } = require('./config/db');
const { getUsers } = require('./models/user.model');
const app = express();
app.use(express.json());

const PORT = process.env.API_PORT;

app.get('/users', async (request, response) => {
    const users = await getUsers();

    response.status(200).json({
        users
    });
})

app.get('/todos', async (request, response) => {
    try {
        const result = await connectDb.query('SELECT * FROM todos');
        if (result.rows.length === 0) {
            return response.status(404).json({
                status: 'Not found',
                message: 'No se encontro ninguna tarea.'
            })
        }
        response.status(200).json(result.rows);
    } catch (error) {
        response.status(500).json({
            status: 'error',
            message: 'Error al obtener las tareas.'
        })
    }
});

app.post('/todos', async (request, response) => {
    const { description, completed, userId } = request.body
    
    const result = await connectDb.query(
        'INSERT INTO todos (description, completed, user_id) VALUES ($1, $2, $3) RETURNING id, description, completed',
        [description, completed, userId])

    response.status(201).json(result.rows[0]);
});

app.put('/todos/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { completed, description } = request.body
        const result = await connectDb.query(
            'UPDATE todos ' +  // Tabla donde quiero actualizar
            'SET completed = $1, description = $2 ' + // Datos/Campos que quiero que se actualizen
            'WHERE id = $3 ' + // Registro donde quiero que sea actualize
            'RETURNING id, description, completed', // Al finalizar la actualizacion los datos que quiero que me devuelva/retorne
            [completed, description, id])
    
        response.status(200).json(result.rows[0])
    } catch (error) {
        console.error(error)
        response.status(500).json({
            status: 'error',
            message: 'Error al actualizar.'
        })
    }
});

app.delete('/todos/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        const result = await connectDb.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
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
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
