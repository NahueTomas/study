const { Router } = require('express')
const { validarJWT } = require('../middlewares/verificar-jwt')
const Materia = require('../models/materia')
const Carta = require('../models/carta')
const Colore = require('../models/colore')

const router = Router()

router.get('/', validarJWT, async (req, res) => {
    // Buscar en la base de datos
    const usuario = req.usuarioAuth
    const materias = await Materia.find({usuario: usuario.nombre})

    res.render( 'app.pug',  {pagina : "STUDY", datos: materias, crear: "nueva-materia", complemento1: "auth/logout", complemento2: "logout"})
})

router.get('/materia/:id',validarJWT, async (req, res) => {
    try{
        const materia = await Materia.findById(req.params.id)
        const cartas = await Carta.find({contenedor: req.params.id})
        res.render( 'materia.pug',  {pagina : "STUDY - materia", datos: materia, cartas,id: req.params.id, crear: `nueva-carta/${materia._id}`})
    }
    catch( err ){
        res.redirect('/404')
    }
})

router.get('/nueva-materia', validarJWT, async (req, res)=> {
    const colores = await Colore.find()

    res.render('nueva-materia', { pagina: 'STUDY - nueva materia', colores: colores[0].materias, complemento1: "", complemento2: "incio"})
})

router.post('/nueva-materia', validarJWT, async (req, res)=> {
    const { materia, color, logo, prof } = req.body
    const nueva_materia = new Materia({materia, color, logo, prof, usuario: req.usuarioAuth.nombre})     
    nueva_materia.save()

    res.redirect('/')
})

router.get('/eliminar-materia/:id', validarJWT, (req, res) => {
    try {
        const { id } = req.params
        res.render('eliminar.pug', {pagina: 'Study - eliminar', complemento1: '', complemento2: 'inicio', id, tipo: "materia" })
    } catch ( err ){
        console.log( err )
        res.redirect('/')
    }
})

router.delete('/materia/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        await Materia.findByIdAndDelete(id) 
        res.redirect('/')
    } catch( err ){
        console.log( err )
        res.redirect('/')
    }
})

router.get('/carta/:id', validarJWT, async (req, res) => {
    try{
        const carta = await Carta.findById(req.params.id)
        res.render( 'carta.pug',  {pagina : "STUDY - carta", carta})
    } catch( err ){
        res.redirect('/404')
    }
})

router.get('/nueva-carta/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const colores = await Colore.find()
        const materia = await Materia.findById(id)
        if( !materia ) res.redirect('/')

        res.render('nueva-carta', { pagina: 'STUDY - crear carta', colores: colores[0].cartas, id: req.params, complemento1: "", complemento2: "incio"})
    } catch( err ){
        console.log(err)
        res.redirect('/')
    }
})

router.get('/eliminar-carta/:id', validarJWT, (req, res) => {
    try {
        const { id } = req.params
        res.render('eliminar.pug', {pagina: 'Study - eliminar', complemento1: '', complemento2: 'inicio', id, tipo: "carta" })
    } catch ( err ){
        res.redirect('/')
    }
})

router.post('/nueva-carta', validarJWT, async (req, res)=> {
    try{
        const { titulo, link, color, contenido, contenedor } = req.body
        const nueva_carta = new Carta({titulo, link, color, contenido, contenedor})
        nueva_carta.save()
        res.redirect(`/materia/${contenedor}`)
    } catch( err ){
        console.log(err)
        res.redirect('/')
    }
})

router.delete('/carta/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const { contenedor } = req.body

        await Carta.findByIdAndDelete(id)
        res.redirect(`/materia/${contenedor}`)
    } catch ( err ){
        res.redirect('/')
    }
})

router.put('/carta/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const { contenedor, ...editado } = req.body

        await Carta.findByIdAndUpdate( id, editado )

        res.redirect(`/materia/${contenedor}`)
    } catch ( err ){
        console.log(err)
        res.redirect('/')
    }
})

router.get('/404', ( req, res ) => {
    res.render('404.pug', { pagina: "Error 404", complemento1: "", complemento2: "inicio"})
})

router.get('*', (req, res) => {
    res.redirect("/404")
})

module.exports = router