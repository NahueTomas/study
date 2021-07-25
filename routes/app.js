const { Router } = require('express')
const { validarJWT } = require('../middlewares/verificar-jwt')
const Materia = require('../models/materia')
const Colore = require('../models/colore')

const router = Router()

// TODO: Leer datos de la base de datos

//const fs = require('fs')
//const rawdata = fs.readFileSync('datos.json')
//const data = JSON.parse(rawdata)

router.get('/', validarJWT, async (req, res) => {
    // Buscar en la base de datos
    const usuario = req.usuarioAuth
    const materias = await Materia.find({usuario: usuario.nombre})

    res.render( 'app.pug',  {pagina : "STUDY", datos: materias, crear: "nueva-materia"})
})

router.get('/materia/:id',validarJWT, async (req, res) => {
    const materia = await Materia.findById(req.params.id)

    res.render( 'materia.pug',  {pagina : "STUDY - materia", datos: materia, id: req.params.id, crear: "nueva-carta"})
})

// TODO
router.get('/carta/:id', validarJWT, (req, res) => {
    let datos = {}

    res.render( 'carta.pug',  {pagina : "STUDY - carta", datos, id: req.params.id})
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

module.exports = router