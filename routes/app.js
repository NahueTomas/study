const { Router } = require('express')

const router = Router()

// TODO: Leer datos de la base de datos
const fs = require('fs')
const rawdata = fs.readFileSync('datos.json')
const data = JSON.parse(rawdata)

// TODO: Cambiar URL en producción

router.get('/', (req, res) => {
    res.render( 'app.pug',  {pagina : "STUDY", datos: data, crear: "nueva-materia"})
})

router.get('/materia/:id', (req, res) => {
    let datos = {}
    data.materias.forEach( materia => {
        if (materia.id == req.params.id){
            datos = materia
        }
    })

    res.render( 'materia.pug',  {pagina : "STUDY - materia", datos, id: req.params.id})
})

module.exports = router