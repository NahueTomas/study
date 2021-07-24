const { Router } = require('express')
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario')
const { validarNombre } = require('../middlewares/validacion-nombre')
const { generarJWT } = require('../helpers/generar-jwt')

const router = Router()

// ENVIA FORMULARIO DE LOGIN
router.get('/login', (req, res) => {
    res.render( 'login.pug', {pagina: "Study - Inicia sesión"})
})

// INICIA SESION
router.post('/login', async (req, res) => {
    
    const { nombre, clave } = req.body
    console.log(nombre, clave)

    try{
        
        // VERIFICAR
        
        // Si existe el nombre
        const usuario = await Usuario.findOne({ nombre })
        if( !usuario ) {return res.render( 'login.pug', { pagina: "Study - Inicia sesión", error: 'El usuario y/o la contraseña están mal' })}

        // Si la contraseña es correcta
        const validPassword = bcryptjs.compareSync( clave, usuario.clave )
        if ( !validPassword ) {return res.render( 'login.pug', { pagina: "Study - Inicia sesión", error: 'El usuario y/o la contraseña están mal' })}

        // Generar JWT
        const token = await generarJWT( usuario._id )

        console.log(usuario)
        res.redirect('/auth/login')

    } catch (err) {
        console.log(err)
        res.status(500).render('error.pug', { pagina: 'Error!!',  error: 'Hable con el administrador'})
    }
})

// ENVIA FORMULARIO DE REGISTRO
router.get('/registro', (req, res) => {
    res.render( 'registro.pug', {pagina: "Study - Registro de usuario"})
})

// NUEVO USUARIO
router.post('/registro', [
    validarNombre
] , async (req, res) => {
    let {nombre, clave} = req.body
    nombre = nombre.trim()

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    clave = bcryptjs.hashSync( clave, salt );
    
    const usuario = new Usuario({nombre, clave})
    await usuario.save();

    res.redirect('/auth/login')
})

module.exports = router