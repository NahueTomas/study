const { Schema, model } = require('mongoose');

const MateriaSchema = Schema({
    materia: {
        type: String,
        required: [true, 'El nombre de la materia es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'El color de la materia es obligatorio']
    },
    prof: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        required: [true, 'El emoji de la materia es obligatorio']
    },
    usuario:{
        type: String,
        required: [true, 'Error con ID de usuario']
    },
    cartas:{
        type: String,
        default: "0"
    }
});

module.exports = model( 'Materia', MateriaSchema );