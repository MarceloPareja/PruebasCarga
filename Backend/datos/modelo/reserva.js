export class Reserva {
    constructor(id, fecha, hora, sala, correo) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.sala = sala;
        this.correo = correo;
    }

    getId() {
        return this.id;
    }

    getFecha() {
        return this.fecha;
    }

    setFecha(fecha) {
        this.fecha = fecha;
    }

    getHora() {
        return this.hora;
    }

    setHora(hora) {
        this.hora = hora;
    }

    getSala() {
        return this.sala;
    }

    setSala(sala) {
        this.sala = sala;
    }

    getCorreo() {
        return this.correo;
    }

    setCorreo(correo) {
        this.correo = correo;
    }
}
