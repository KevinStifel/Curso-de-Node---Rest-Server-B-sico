import { response } from 'express';

import bcryptjs from 'bcryptjs';

import { Usuario } from '../models/usuario.js';

// Poner res = response ayuda a que despues me aparezcan las opciones al poner res.status por ejemplo

const usuariosGet = async (req = request, res = response) => {

    // const { q = 'No query', nombre = 'No name', apikey = 'No apikey'} = req.query;

    const { limite = 5, desde = 0, hasta = 3  } = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query)
    // .skip(Number( desde ))
    // .limit(Number( limite ));

    // const total = await Usuario.countDocuments(query);


    // Es mucho más rápido hacer las peticiones de esta forma pues se ejecutan a la vez, por lo tanto el tiempo de respuesta es menor, más de la mitad.

    const [ total_usuarios, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);
 
    res.json({
        total_usuarios,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    // Si sacamos el _id ya no se va a caer la aplicación pues no la actualizaremos.
    const { _id, password, google, correo, ... resto } = req.body;

    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync(10); // El número es la dificultad de la encriptación, si le pongo 100 toma mas en generarse.
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true}); 
    
    res.json(usuario);
}
const usuariosPut404 = (req, res = response) => {

    res.json({
        msg: 'put API - No Existe', 
    });
}

const usuariosPost = async (req, res = response) => {

    // const { google, ...resto } = req.body; Asi solo sacaria google el body seria resto
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10); // El número es la dificultad de la encriptación, si le pongo 100 toma mas en generarse.
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    console.log(`usuario ${usuario} guardado`);

    res.json(usuario);
}

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    const uid = req.uid;

    
    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    // Cambiar el estado del usuario a false
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    // No hago nada pero ahí está el autenticado
    const usuarioAutenticado = req.usuario;

    res.json({
        usuarioBorrado : usuario,
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - Controlador'
    });
}

export { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosPut404,
};