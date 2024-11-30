const { connectDb } = require("../config/db");

const getUsers = async () => {
    const result = await connectDb.query('SELECT * FROM users');
    return result.rows
}

const getUserByEmail = async (email) => {
    const result = await connectDb.query('SELECT * FROM users WHERE email = $1', [email])
    return result.rows[0]
}

const createUser = async (fullName, email, password) => {
    const result = await connectDb.query(
        'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email', 
        [fullName, email, password]
    );
    return result.rows
}

module.exports = {
    getUsers,
    getUserByEmail,
    createUser
}