import express from 'express';
import { obtener_todos, crear, eliminar } from '../controlador/estudiante_controlador.js';

const router = express.Router();

router.get('/estudiantes', obtener_todos);
router.post('/estudiantes', crear);
router.delete('/estudiantes/:id', eliminar);

export default router;