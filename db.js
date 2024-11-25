const { Pool } = require('pg');

const connectDb = new Pool({
    user: 'bios',
    host: 'localhost',
    database: 'todo_list',
    password:'secretpassword123',
    port: 5432
})

module.exports = {
    connectDb
}