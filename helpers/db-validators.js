
import { Rol } from '../models/role.js';

import { Usuario } from '../models/usuario.js';

// Estos son validaciones personalizadas.

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({rol});
    console.log(rol);
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

// Validar si el mail ya está registrado en la BD

const emailExiste = async (correo = '' ) => {
    const existecorreo = await Usuario.findOne({ correo });
    if (existecorreo) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`);
    }
};

// Verificar si existe el usuario enviado como id en la BD.

const existeUsuarioPorIdCustom = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
};





// const existeEmail = await Usuario.findOne({correo}); // Es lo mismo que poner donde el correo: correo
// if ( existeEmail ) {
//     return res.status(400).json({
//         msg: 'El correo ya está registrado'
//     })
// }


export { esRolValido, emailExiste, existeUsuarioPorIdCustom };