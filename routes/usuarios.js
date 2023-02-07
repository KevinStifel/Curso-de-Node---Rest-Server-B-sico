import { Router } from 'express';

import { usuariosGet, usuariosPut, usuariosPost,  usuariosDelete, usuariosPatch, usuariosPut404 } from '../controllers/usuarios.js';

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut );

router.put('/', usuariosPut404)

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export { router };