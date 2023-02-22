import { Router } from 'express';

import { check } from 'express-validator';

// Controladores
import { usuariosGet, usuariosPut, usuariosPost,  usuariosDelete, usuariosPatch, usuariosPut404 } from '../controllers/usuarios.js';

// Helpers
import { esRolValido, emailExiste, existeUsuarioPorIdCustom} from '../helpers/db-validators.js';


// Junte los 3 en una sola importacion que reconoce como index.js en la carpeta de middlewares
// Tiene que ser el nombre index (es algo de node), va a buscar el archivo directamente
// Asi junto 3 importaciones en solo una

// Middlewares Personalizados
import { validarCampos, validarJWT, esAdminRole, tieneRol } from '../middlewares/index.js';

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
        // En ValidarJWT se define el usuario en la request, por lo que en esAdminRole ya se puede acceder a esa propiedad.
        validarJWT,
        // esAdminRole,
        tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existeUsuarioPorIdCustom ),
        validarCampos
    ]
    ,usuariosDelete);    

router.patch('/', usuariosPatch);

export { router as router_usuarios };