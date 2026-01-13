const express = require('express');
const usuarioRoutes = require('./rutas/usuario_rutas');

const app = express();
app.use(express.json());

app.use('/api/auth', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});