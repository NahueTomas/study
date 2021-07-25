const { Schema, model } = require('mongoose');

const ColoreSchema = Schema({
    materias: {
        type: Array,
        default: ""
    },
    cartas: {
        type: Array,
        default: ""
    }
});

module.exports = model( 'Colore', ColoreSchema );