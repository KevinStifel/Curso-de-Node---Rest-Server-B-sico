import { response } from "express";


const esAdminRole = (req, res = response, next) => {

    
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    // Como si está registrado en la BD el usuario, se desestructura su información
    const { rol, nombre } = req.usuario;

    console.log(rol);

    if ( rol !== 'ADMIN_ROLE' ) {

        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede borrar a un usuario`
        })
    }

    next();
};

// Si se escribe de esta forma puede recibir argumentos desde las routes, pero debe retornar una función.

// Esta es una forma de recibir un numero indefinido de variables, las agarra todas y las junta en resto.
const tieneRol = ( ... roles) => {
    
    return (req, res= response, next) => {

        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        const { rol } = req.usuario;


        if ( !roles.includes(rol) ) {

            return res.status(401).json({
                
                msg: `El servicio requiere uno de estos roles: ${roles}`
            })
        }


        next();
    }
};

export { esAdminRole, tieneRol };