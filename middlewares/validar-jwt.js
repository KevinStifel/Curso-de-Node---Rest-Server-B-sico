import { request } from 'express';

import { Usuario } from '../models/usuario.js'

import jwt from 'jsonwebtoken';

const validarJWT = async (req = request, res, next) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATE_KEY )

        // Leer el usuario que corresponde al uid

        const usuario = await Usuario.findById( uid );
        
        // Se crea propiedad nueva dentro del objeto request.
        req.uid = uid;
        req.usuario = usuario;
        
        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            })
        }

        // Verificar si el uid tiene estado en true, es decir, existe.
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - estado en false'
            })
        }



        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }
};

export { validarJWT }; 