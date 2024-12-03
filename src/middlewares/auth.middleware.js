const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

const verifyToken = (request, response, next) => {
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJtYXJjbzEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzI1NzQ1NjQsImV4cCI6MTczMjYwMzM2NH0.2zNhejTLb2JzN7g5QYsXsdBZECvBCPr7KJ0G2rgerUQ
    console.log('Token', token);

    if (!token) {
        return response.status(403).json({
            status: 'forbidden',
            message: 'Token no proporcionado'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        request.user = decoded;
        console.log('Request User en el archivo auth.middleware', request.user)
        next();
    } catch (error) {
        console.error('Error en el middleware de auth verificando el token.')
        response.status(401).json({
            status: 'unauthorized',
            message: 'Token invalido'
        })
    }
}

module.exports = {
    verifyToken
}
