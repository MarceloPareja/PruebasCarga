const express = require('express');
const cors =require('cors');

const usuarioRoutes = require('./rutas/usuario_rutas');
const reservasRoutes = require('./rutas/reservas_rutas');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', usuarioRoutes);
app.use('/api/reservas', reservasRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});