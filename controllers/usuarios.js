import { response } from 'express';

// Poner res = response ayuda a que despues me aparezcan las opciones al poner res.status por ejemplo

const usuariosGet = (req = request, res = response) => {

    const { q = 'No query', nombre = 'No name', apikey = 'No apikey'} = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey,
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;
    
    res.json({
        msg: 'put API - Controlador',
        id
        
    });
}
const usuariosPut404 = (req, res = response) => {

    res.json({
        msg: 'put API - No Existe',
    });
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad} = req.body;

    res.json({
        msg: 'post API - Controlador',
        nombre, 
        edad,
    });
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - Controlador'
    });
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