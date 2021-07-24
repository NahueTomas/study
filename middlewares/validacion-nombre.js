const Usuario = require('../models/usuario')

const validarNombre = async (req, res, next) =>{
    const { nombre, clave} = req.body

    if ( !nombre.trim() && !clave ){ return res.status(401).render('registro.pug', { pagina: 'Study - Registro de usuario', error: 'No se admiten campos vacíos'}) }
    
    const usuario = await Usuario.findOne({nombre})

    if( usuario ) { return res.status(401).render('registro.pug', { pagina: 'Study - Registro de usuario', error: 'Ese usuario ya existe'} )}

    next()
}

module.exports = {
    validarNombre
}