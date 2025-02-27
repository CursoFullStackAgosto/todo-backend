require('dotenv').config()

const express = require('express');
const { verifyToken } = require('./middlewares/auth.middleware');

const { todosRouter } = require('./routes/todos.routes');
const { usersRouter } = require('./routes/users.routes');
const { authRouter } = require('./routes/auth.routes');

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT;

app.use('/auth', authRouter);

app.use(verifyToken);

app.use('/users', usersRouter);

app.use('/todos', todosRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
