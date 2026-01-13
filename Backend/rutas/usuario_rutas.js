const { Router } = require('express');
const controlador= require('../controlador/usuario_controller');

const router = Router();

router.get('/:correo', controlador.buscarUsuario);
router.post('/login', controlador.login);
router.post('/register', controlador.registrarUsuario);

module.exports = router;