const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const menuRoutes = require('./routes/menuRoutes');
const restauranteRoutes = require('./routes/restauranteRoutes');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Conexión a la base de datos
sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/reservas', reservaRoutes);
app.use('/menus', menuRoutes);
app.use('/restaurantes', restauranteRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});