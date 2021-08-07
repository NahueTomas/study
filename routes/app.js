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

// ==========================
//       MODO PRUEBA
// ==========================
router.get('/prueba/:id', validarJWT, async (req, res) => {
    try{
        const cartas = await Carta.find({contenedor: req.params.id})
        res.json({cartas, id: req.params.id})
    } catch( err ){
        res.redirect('/404')
    }
})

// ==========================
//         MATERIA
// ==========================

router.get('/materia/:id',validarJWT, async (req, res) => {
    try{
        const materia = await Materia.findById(req.params.id)
        const cartas = await Carta.find({contenedor: req.params.id})
        res.render( 'materia.pug',  {pagina : "STUDY - materia", datos: materia, cartas, id: req.params.id, crear: `nueva-carta/${materia._id}`})
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
    try{
        const { materia, color, logo, prof } = req.body
        const nueva_materia = new Materia({materia, color, logo, prof, usuario: req.usuarioAuth.nombre})     
        await nueva_materia.save()
        res.redirect('/')
    } catch ( err ){
        res.redirect('/')
    }
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

router.get('/editar-materia/:id', validarJWT, async (req, res) => {
    try{
        const { id } = req.params
        const datos = await Materia.findById(id)
        const colores = await Colore.find()

        res.render('editar-materia.pug', {pagina: 'STUDY - editar', complemento1: '', complemento2: 'inicio', datos, colores: colores[0].materias})
    } catch (err){
        console.log(err)
        res.redirect('/404')
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

router.put('/materia/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const { ...editado } = req.body

        await Materia.findByIdAndUpdate( id, editado )

        res.redirect(`/`)
    } catch ( err ){
        console.log(err)
        res.redirect('/404')
    }
})

// ==========================
//          CARTAS
// ==========================

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

        res.render('nueva-carta', { pagina: 'STUDY - crear carta', colores: colores[0].cartas, id, complemento1: "", complemento2: "incio"})
    } catch( err ){
        console.log(err)
        res.redirect('/')
    }
})

router.post('/nueva-carta', validarJWT, async (req, res)=> {
    try{
        const { titulo, link, color, contenido, contenedor } = req.body
        const nueva_carta = new Carta({titulo, link, color, contenido, contenedor})
        await nueva_carta.save()
        
        let cartas = await Carta.find({contenedor})
        const obj = {cartas: String(cartas.length)}
        await Materia.findByIdAndUpdate(contenedor, obj)
        
        res.redirect(`/materia/${contenedor}`)
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

router.get('/editar-carta/:id', validarJWT, async (req, res) => {
    try {
        const { id } = req.params
        const carta = await Carta.findById(id)
        const colores = await Colore.find()

        res.render('editar-carta.pug', {pagina: 'Study - editar', complemento1: '', complemento2: 'inicio', id, colores: colores[0].cartas, carta })
    } catch ( err ){
        res.redirect('/')
    }
})

router.delete('/carta/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const carta = await Carta.findByIdAndDelete(id)

        let cartas = await Carta.find({contenedor: carta.contenedor})
        const obj = { cartas: String(cartas.length)}
        await Materia.findByIdAndUpdate({_id: carta.contenedor}, obj)   

        res.json( {redirect: `/materia/${carta.contenedor}`} )
    } catch ( err ){
        res.redirect('/')
    }
})

router.put('/carta/:id', validarJWT, async (req, res)=> {
    try{
        const { id } = req.params
        const { contenedor, ...editado } = req.body

        const carta = await Carta.findByIdAndUpdate( id, editado )

        res.json( {redirect: `/materia/${carta.contenedor}`} )
    } catch ( err ){
        console.log(err)
        res.redirect('/')
    }
})

// ==========================
//         ERROR
// ==========================

router.get('/404', ( req, res ) => {
    res.render('404.pug', { pagina: "Error 404", complemento1: "", complemento2: "inicio"})
})

router.get('*', (req, res) => {
    res.redirect("/404")
})

module.exports = router