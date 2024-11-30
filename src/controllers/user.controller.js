const { getUsers } = require("../models/user.model");

const getUsersController = async (request, response) => {
    const users = await getUsers();

    response.status(200).json({
        users
    });
}

module.exports = {
    getUsersController
}