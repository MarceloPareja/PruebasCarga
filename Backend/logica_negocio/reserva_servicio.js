import { ReservaService } from '../logica_negocio/reserva_servicio.js';

const service = new ReservaService();

export const obtener_todos = (req, res) => {
  res.json(service.listar());
};

export const crear = (req, res) => {
  try {
    const { fecha, hora, idSala, correo } = req.body;

    const nueva = service.registrar(fecha, hora, idSala, correo);
    res.status(201).json(nueva);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminar = (req, res) => {
  const eliminado = service.eliminar(req.params.id);

  if (eliminado) {
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
};
