const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    const { token } = req.session

    if ( !token ){
        return res.redirect("/bienvenido")
    }

    try{
        const { uid } = jwt.verify( token, process.env.FIRMA )

        const usuarioAutenticado = await Usuario.findById(uid)
        if ( !usuarioAutenticado ) { return res.redirect("/auth/login") }

        req.usuarioAuth = usuarioAutenticado

        next()
    } catch(err){
        req.session.token = ""
        res.redirect("/bienvenido")
    }
}

module.exports = {
    validarJWT
}