import express from 'express';
import cors from 'cors';
import { router_usuarios } from '../routes/usuarios.js'
import { router_auth } from '../routes/auth.js'
import { dbConnection } from '../database/config.js';



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body. Serializa a json lo que venga en el body.
        this.app.use(express.json());


        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        // Middleware condicional, se carga en esta ruta.
        // En vez de poner this.app.use(router);
        this.app.use(this.authPath, router_auth );
        this.app.use(this.usuariosPath, router_usuarios );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

export { Server };