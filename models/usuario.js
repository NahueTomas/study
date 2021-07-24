const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio']
    },
    clave: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    materias: {
        type: Array,
        default: []
    }
});

module.exports = model( 'Usuario', UsuarioSchema );