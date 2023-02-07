import express from 'express';
import cors from 'cors';
import { router } from '../routes/usuarios.js'



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
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
        this.app.use(this.usuariosPath, router );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}

export { Server };
