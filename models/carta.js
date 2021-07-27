const { Schema, model } = require('mongoose');

const CartaSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre de la carta es obligatorio']
    },
    color: {
        type: String,
        required: [true, 'El color de la carta es obligatorio']
    },
    link: {
        type: String,
        default: ""
    },
    contenido: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    contenedor: {
        type: String,
        required: [true, 'Error, no se cargó el contenedor']
    }
});

module.exports = model( 'Carta', CartaSchema );