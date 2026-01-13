import { estudiante } from '../datos/modelo/';
import { lista_estudiantes } from '../datos/repositorio/lista_estudiantes.js';

const repo = new lista_estudiantes();

export class EstudianteService {
  registrar(nombre, edad) {
    if (!nombre || nombre.trim().length < 2)
      throw new Error('Nombre inválido');
    if(this.no_tiene_numeros(nombre) === false)
        throw new Error('El nombre no puede contener números');

    if (!edad || isNaN(edad))
        throw new Error('Edad inválida');
    if (edad < 0 || edad > 100)
      throw new Error('Edad fuera de rango');

    const nuevo = new estudiante(null, nombre.trim(), parseInt(edad));
    return repo.agregar(nuevo);
  }

  no_tiene_numeros(cadena) {
  return !/\d/.test(cadena);
    }
  listar() { return repo.obtener_todos(); }

  eliminar(id) { return repo.eliminar_por_id(parseInt(id)); }

  obtener_por_id(id) { return repo.buscar_por_id(parseInt(id)); }
}