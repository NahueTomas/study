const { Router } = require('express')

const router = Router()

const fs = require('fs')
const rawdata = fs.readFileSync('datos.json')
const data = JSON.parse(rawdata)

router.get('/', (req, res) => {
    res.render( 'app.pug',  {pagina : "STUDY", datos: data})
})

module.exports = router