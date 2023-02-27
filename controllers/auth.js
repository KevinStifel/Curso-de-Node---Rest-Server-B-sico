import { response } from "express";

import bcryptjs from 'bcryptjs';

import { Usuario } from "../models/usuario.js";

import { generarJWT } from "../helpers/generar-jwt.js";

import { googleVerify } from "../helpers/google-verify.js";

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
        
        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password ) // compareSync compara si las dos contraseñas son iguales con el password con hash registrado en la BD.

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password no iguales'
            })
        }


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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        // 1er caso: Usuario no existe
        if ( !usuario ) {
            // Creo usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            
            await usuario.save();
            
        }

        // 2do caso: Si el usuario está bloqueado. Es decir, tiene su estado en false.

        if ( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        };

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
        
    } catch (error) {

        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
        
    }
}

export { login, googleSignIn };