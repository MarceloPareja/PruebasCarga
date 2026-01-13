// import {estudiante} from "../modelo/reserva.js";
// // Implementa el patrón de diseño Singleton para asegurar una única instancia.
// class Lista_Estudiantes {
//   /**
//    * Constructor privado simulado.
//    * Inicializa la lista de estudiantes y el contador de IDs.
//    */
//   constructor() {
//     if (Lista_Estudiantes.instancia) {
//       return Lista_Estudiantes.instancia;
//     }
//     this.estudiantes = [];
//     this.siguienteId = 1;
//     Lista_Estudiantes.instancia = this;
//   }

//   /**
//    * Obtiene la instancia única de la clase Lista_Estudiantes.
//    * @returns {Lista_Estudiantes} La instancia única.
//    */
//   static obtenerInstancia() {
//     if (!Lista_Estudiantes.instancia) {
//       Lista_Estudiantes.instancia = new Lista_Estudiantes();
//     }
//     return Lista_Estudiantes.instancia;
//   }

//   /**
//    * Agrega un nuevo estudiante a la lista.
//    * @param {Object} estudiante - El objeto estudiante a agregar.
//    * @returns {Object} El estudiante agregado con su ID asignado.
//    */
//   agregar(estudiante) {
//     estudiante.id = this.siguienteId++;
//     this.estudiantes.push(estudiante);
//     return estudiante;
//   }

//   /**
//    * Obtiene todos los estudiantes registrados.
//    * @returns {Array} Un arreglo con todos los estudiantes.
//    */
//   obtener_todos() {
//     return [...this.estudiantes];
//   }

//   /**
//    * Busca un estudiante por su ID.
//    * @param {number} id - El ID del estudiante a buscar.
//    * @returns {Object|undefined} El estudiante encontrado o undefined si no existe.
//    */
//   buscar_por_id(id) {
//     return this.estudiantes.find((e) => e.id === id);
//   }

//   /**
//    * Elimina un estudiante por su ID.
//    * @param {number} id - El ID del estudiante a eliminar.
//    * @returns {boolean} True si se eliminó correctamente, False si no se encontró.
//    */
//   eliminar_por_id(id) {
//     const index = this.estudiantes.findIndex((e) => e.id === id);
//     if (index !== -1) {
//       this.estudiantes.splice(index, 1);
//       return true;
//     }
//     return false;
//   }

//   // hacer reserva id de sala funcion validacion correo y sala

  
// }

// // Exporta la instancia única directamente
// const instanciaRepositorio = new Lista_Estudiantes();
// export default instanciaRepositorio;
// Implementa el patrón Singleton
class Lista_Reservas {

  constructor() {
    if (Lista_Reservas.instancia) {
      return Lista_Reservas.instancia;
    }
    this.reservas = [];
    this.siguienteId = 1;
    Lista_Reservas.instancia = this;
  }

  static obtenerInstancia() {
    if (!Lista_Reservas.instancia) {
      Lista_Reservas.instancia = new Lista_Reservas();
    }
    return Lista_Reservas.instancia;
  }

  validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
  }

  salaDisponible(idSala, fecha, hora) {
    return !this.reservas.some(
      (r) =>
        r.idSala === idSala &&
        r.fecha === fecha &&
        r.hora === hora
    );
  }

  agregar(reserva) {

    // Validar correo
    if (!this.validarCorreo(reserva.correo)) {
      throw new Error("Correo inválido");
    }

    // Validar disponibilidad de sala
    if (!this.salaDisponible(reserva.idSala, reserva.fecha, reserva.hora)) {
      throw new Error("La sala ya está reservada en esa fecha y hora");
    }

    reserva.id = this.siguienteId++;
    this.reservas.push(reserva);
    return reserva;
  }

  obtener_todos() {
    return [...this.reservas];
  }

  buscar_por_id(id) {
    return this.reservas.find((r) => r.id === id);
  }

  eliminar_por_id(id) {
    const index = this.reservas.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.reservas.splice(index, 1);
      return true;
    }
    return false;
  }
}

const instanciaRepositorio = new Lista_Reservas();
export default instanciaRepositorio;
