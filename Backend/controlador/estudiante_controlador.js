import { EstudianteService } from '../logica_negocio/estudiante_servicio.js';

const service = new EstudianteService();

export const obtener_todos = (req, res) => {
  res.json(service.listar());
};

export const crear = (req, res) => {
  try {
    const { nombre, edad } = req.body;
    const nuevo = service.registrar(nombre, edad);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminar = (req, res) => {
  const eliminado = service.eliminar(req.params.id);
  if (eliminado) {
    res.json({ mensaje: 'Eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Estudiante no encontrado' });
  }
};