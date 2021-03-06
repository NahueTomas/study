const express = require('express')
const session = require('express-session')
const { dbConnection } = require('./bdd')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PUERTO || process.env.PORT

        this.rutas = {
            login: '/auth',
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
        this.app.use(session({secret: process.env.SECRETO, resave: false, saveUninitialized: false}))
    }

    routes(){
        this.app.use( this.rutas.login, require('../routes/auth') )
        this.app.use( this.rutas.app, require('../routes/app') )
    }

    listen() {
        this.app.listen(this.port, ()=> {
            console.log('Corriendo en el puerto: ', this.port)
        })
    }
}

module.exports = Server