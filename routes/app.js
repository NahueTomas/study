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
    const materia = await Materia.findById(req.params.id)

    if(!materia) res.redirect('/')

    const cartas = await Carta.find({contenedor: req.params.id})

    res.render( 'materia.pug',  {pagina : "STUDY - materia", datos: materia, cartas,id: req.params.id, crear: `nueva-carta/${materia._id}`})
})

// TODO
router.get('/carta/:id', validarJWT, async (req, res) => {
    const carta = await Carta.findById(req.params.id)
    if(!carta) res.redirect('/')

    res.render( 'carta.pug',  {pagina : "STUDY - carta", carta})
})

router.get('/nueva-materia', validarJWT, async (req, res)=> {
    const colores = await Colore.find()

    res.render('nueva-materia', { pagina: 'STUDY - nueva materia', colores: colores[0].materias})
})

router.post('/nueva-materia', validarJWT, async (req, res)=> {
    const { materia, color, logo, prof } = req.body
    const nueva_materia = new Materia({materia, color, logo, prof, usuario: req.usuarioAuth.nombre})     
    nueva_materia.save()

    res.redirect('/')
})

router.get('/nueva-carta/:id', validarJWT, async (req, res)=> {
    const colores = await Colore.find()
    res.render('nueva-carta', { pagina: 'STUDY - crear carta', colores: colores[0].cartas, id: req.params.id})
})

router.post('/nueva-carta', validarJWT, async (req, res)=> {
    const { titulo, link, color, contenido, contenedor } = req.body

    const nueva_carta = new Carta({titulo, link, color, contenido, contenedor})
    nueva_carta.save()
    
    res.redirect(`/materia/${contenedor}`)
})

module.exports = router