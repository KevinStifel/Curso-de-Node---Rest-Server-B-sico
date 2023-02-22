import { response } from "express";

import bcryptjs from 'bcryptjs';

import { Usuario } from "../models/usuario.js";

import { generarJWT } from "../helpers/generar-jwt.js";

// const usuario = new Usuario();

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try { 

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar si el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const token = await generarJWT( usuario.id );

        const validPassword = bcryptjs.compareSync( password, usuario.password ) // compareSync compara si las dos contraseñas son iguales con el password con hash registrado en la BD.

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password no iguales'
            })
        }

        // Generar el JWT

        res.json({
            usuario,
            token
        })

    } catch ( error ) {
        // No es necesario ponerle un return, al igual que en el anterior ya que solo se permite uno.
        return res.status(500).json({
            msg: 'Contacte al administrador'
        })
    }
}

export { login };