const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const menuRoutes = require('./routes/menuRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');
const cors = require('cors'); // Importar el middleware cors

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Configurar CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Conexión a la base de datos
sequelize.sync({ alter: true })
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/reservas', reservaRoutes);
app.use('/menus', menuRoutes);
app.use('/restaurantes', restauranteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});