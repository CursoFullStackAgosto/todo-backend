const { getUserByEmail, createUser } = require("../models/user.model");

const registerController = async (request, response) => {
    const {fullName, email, password} = request.body

    try {
        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return response.status(400).json({
                status: 'error',
                message: 'El usuario ya esta registrado!'
            })
        }
        const newUser = await createUser(fullName, email, password);

        response.status(201).json({
            status: 'OK',
            message: 'Usuario registrado exitosamente',
            data: newUser
        })
    } catch (error) {
        console.error('Error al crear/registrar el usuario', error);
        response.status(500).json({
            status: 'error',
            message: 'Error al crear/registrar el usuario'
        })
    }
}

const loginController = async (request, response) => {
    const {} = request.body

    response.status(200).json({
        message: 'Hola desde el endpoint de auth'
    })
}


module.exports = {
    registerController,
    loginController
}