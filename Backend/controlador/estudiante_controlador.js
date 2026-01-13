import { ReservaService } from '../logica_negocio/reserva_servicio.js';

const service = new ReservaService();

/**
 * Obtener todas las reservas
 */
export const obtener_todos = (req, res) => {
  res.json(service.listar());
};

/**
 * Crear una nueva reserva
 */
export const crear = (req, res) => {
  try {
    const { fecha, hora, idSala, correo } = req.body;

    if (!fecha || !hora || !idSala || !correo) {
      return res.status(400).json({
        error: 'Faltan campos requeridos'
      });
    }

    const nuevaReserva = service.registrar(fecha, hora, idSala, correo);
    res.status(201).json(nuevaReserva);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Eliminar una reserva por ID
 */
export const eliminar = (req, res) => {
  const eliminado = service.eliminar(Number(req.params.id));

  if (eliminado) {
    res.json({ mensaje: 'Reserva eliminada correctamente' });
  } else {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
};
