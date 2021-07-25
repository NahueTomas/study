const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    const { token } = req.session

    if ( !token ){
        return res.redirect("/auth/login")
    }

    try{
        const { uid } = jwt.verify( token, process.env.FIRMA )

        const usuarioAutenticado = await Usuario.findById(uid)
        if ( !usuarioAutenticado ) { return res.redirect("/auth/login") }

        req.usuarioAuth = usuarioAutenticado

        next()
    } catch(err){
        console.log(err)
        res.redirect("/auth/login")
    }
}

module.exports = {
    validarJWT
}