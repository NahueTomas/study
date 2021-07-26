const Usuario = require('../models/usuario')

const validarNombre = async (req, res, next) =>{
    const { nombre, clave} = req.body

    if ( !nombre.trim() && !clave ){ return res.status(401).render('registro.pug', { pagina: 'Study - Registro de usuario', error: 'No se admiten campos vacíos', complemento1: "auth/login", complemento2: "login"}) }
    
    const usuario = await Usuario.findOne({nombre})

    if( usuario ) { return res.status(401).render('registro.pug', { pagina: 'Study - Registro de usuario', error: 'Ese usuario ya existe', complemento1: "auth/login", complemento2: "login"} )}

    next()
}

module.exports = {
    validarNombre
}