const { Router } = require('express');
const controlador = require('../controlador/reserva_controller');

const router = Router();

// Obtener todas las reservas
router.get('/', controlador.obtener_todos);

// Crear una reserva
router.post('/', controlador.crear);

// Eliminar una reserva por ID
router.delete('/:id', controlador.eliminar);

module.exports = router;
