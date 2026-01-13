const usuario = require('../modelo/usuario')
const {generar_token} = require('../../middleware/token_manager');
let lista_usuario = [];

const obtenerPorCorreo = (correo) => {
    return lista_usuario.find(u => u.correo === correo);
};

const verificarCredenciales = (correo, password) => {
    const usuario = lista_usuario.find(u => u.correo === correo && u.contrasenia === password);
    
    if (!usuario) {
        return null;
    }
    const payload = {
        correo: usuario.correo,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
    };

    const token = generar_token(payload);

    const { contrasenia, ...usuarioSinPassword } = usuario;

    return {
        token,
        usuario: usuarioSinPassword
    };
};

const crearUsuario = (correo, nombre, apellido, password) => {
    if (obtenerPorCorreo(correo)) {
        throw new Error('Ya existe un usuario registrado con este correo');
    }

    const nuevoUsuario = new usuario(correo, nombre, apellido, password);
    lista_usuario.push(nuevoUsuario);
    
    return nuevoUsuario;
};

module.exports = {
    obtenerPorCorreo,
    verificarCredenciales,
    crearUsuario
};
