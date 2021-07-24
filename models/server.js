const express = require('express')
const { dbConnection } = require('./bdd')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PUERTO

        this.rutas = {
            login: '/auth',
            inicio: '/bienvenido',
            app: '/'
        }

        // Conectando a la Base de datos
        this.conectarDB()

        // Activando middlewares
        this.middlewares()

        // Rutas de la app
        this.routes()
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( express.json() )
        this.app.use(express.urlencoded({extended: true}));
        this.app.use( express.static('public') )
        this.app.set('views', './views')
        this.app.set('view engine', 'pug')
    }

    routes(){
        this.app.use( this.rutas.app, require('../routes/app') )
        this.app.use( this.rutas.login, require('../routes/auth') )
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Corriendo en el puerto: ', this.port)
        })
    }
}

module.exports = Server