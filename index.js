const express = require('express');
const { connectDb } = require('./db');
const app = express();
app.use(express.json());

const PORT = 3000;

// In-memory "database"
let todos = [];

// Users
app.get('/users', async (request, response) => {
    const result = await connectDb.query('SELECT * FROM users')
    response.status(200).json({
        users: result.rows
    })
})

// Routes
app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    todos.push(newItem);
    res.status(201).json(newItem);
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        res.json(todos[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(item => item.id !== parseInt(id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
