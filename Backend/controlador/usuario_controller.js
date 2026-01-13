const usuarioService = require('../datos/repositorio/lista_usuario');

const buscarUsuario = (req, res) => {
    try {
        const { correo } = req.params;
        
        const usuario = usuarioService.obtenerPorCorreo(correo);
        
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                mensaje: 'Usuario no encontrado'
            });
        }

        const { contrasenia, ...usuarioSinPass } = usuario;
        
        res.json({
            ok: true,
            usuario: usuarioSinPass
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            error: error.message
        });
    }
};

const login = (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Correo y contraseña son requeridos'
            });
        }

        const resultado = usuarioService.verificarCredenciales(correo, password);

        if (!resultado) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Credenciales incorrectas'
            });
        }
        res.json({
            ok: true,
            mensaje: 'Inicio de sesión exitoso',
            token: resultado.token,
            usuario: resultado.usuario
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: 'Error del servidor',
            error: error.message
        });
    }
};

const registrarUsuario = (req, res) => {
    try {
        const { correo, nombre, apellido, password } = req.body;

        if (!correo || !nombre || !apellido || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Faltan campos requeridos'
            });
        }

        const nuevoUsuario = usuarioService.crearUsuario(correo, nombre, apellido, password);

        const { contrasenia, ...usuarioCreado } = nuevoUsuario;

        res.status(201).json({
            ok: true,
            mensaje: 'Usuario creado exitosamente',
            usuario: usuarioCreado
        });

    } catch (error) {
        const status = error.message.includes('ya existe') ? 409 : 500;

        res.status(status).json({
            ok: false,
            mensaje: error.message
        });
    }
};

const controlador = {
    buscarUsuario,
    login,
    registrarUsuario
}
module.exports = controlador;