const getUsers = async () => {
    const result = await connectDb.query('SELECT * FROM users');
    return result.rows
}

module.exports = {
    getUsers
}