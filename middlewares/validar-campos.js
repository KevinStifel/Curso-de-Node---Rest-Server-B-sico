import { validationResult } from 'express-validator';


const validarCampos = (req, res, next) => {

    // Reviso posibles errores que hayan venido de la validación del middleware express-validator hecha en el body.
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        console.log(`Los errores son ${errores.array()}`);
        return res.status(400).json({errores: errores.array() });
    }


    // El next es para que continue con el siguiente middleware como estamos haciendo un middleware. Así continua al siguiente check.
    next();
}


export { validarCampos };
