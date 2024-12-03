const bcrypt = require('bcrypt')
const { getUserByEmail, createUser } = require("../models/user.model");
const { generateToken } = require('../config/jwt');

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

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(fullName, email, hashedPassword);

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
    const { email, password } = request.body;

    try {
        const user = await getUserByEmail(email);

        if (!user) {
            return response.status(404).json({
                status: 'not found',
                message: 'No encontramos el usuario.'
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(401).json({
                status: 'unauthorized',
                message: 'Credenciales invalidas'
            })
        }

        const token = generateToken(user.id, user.email);

        response.json({
            user: {
                userId: user.id,
                email: user.email
            },
            token
        })
    } catch (error) {
        console.error('Error al hacer login:', error)
        response.status(500).json({
            status: 'error',
            message: 'Error al hacer login.'
        })
    }
}


module.exports = {
    registerController,
    loginController
}