const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render( 'login.pug', {pagina: "Study - Inicia sesión"})
})

module.exports = router