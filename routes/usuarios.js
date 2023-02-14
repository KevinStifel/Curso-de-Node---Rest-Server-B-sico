import { Router } from 'express';

import { check } from 'express-validator';

import { usuariosGet, usuariosPut, usuariosPost,  usuariosDelete, usuariosPatch, usuariosPut404 } from '../controllers/usuarios.js';

import { validarCampos } from '../middlewares/validar-campos.js';

import { esRolValido, emailExiste, existeUsuarioPorIdCustom} from '../helpers/db-validators.js';


const router = Router();

router.get('/', usuariosGet);

router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorIdCustom ),
        check('rol').custom( esRolValido ),

        // Si alguna de las validaciones de check dió error, esta las valida con ValidationResult y muestra el error
        validarCampos
    ],
    // Empieza a usar la lógica para manejar la respuesta
    usuariosPut 
    );

router.put('/', usuariosPut404)

// El check me permite analizar que campo del body quiero validar.  
router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'La contraseña debe ser de más de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('correo').custom( emailExiste ),
        check('rol').custom( esRolValido ),

        // Si alguna de las validaciones de check dió error, esta las valida con ValidationResult y muestra el error
        validarCampos,
    ],

    // Empieza a usar la lógica para manejar la respuesta
    usuariosPost
    );

router.delete('/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorIdCustom ),
        validarCampos
    ]
    ,usuariosDelete);    

router.patch('/', usuariosPatch);

export { router };