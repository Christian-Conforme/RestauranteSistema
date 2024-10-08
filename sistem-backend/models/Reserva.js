const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Restaurante = require('./Restaurante');
const Menu = require('./Menu');

const Reserva = sequelize.define('Reserva', {
    fecha: {
        type: DataTypes.DATEONLY, // Solo año, mes y día
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME, // Solo horas y minutos
        allowNull: false
    },
    numeroPersonas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'reservas'
});

Reserva.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Reserva.belongsTo(Restaurante, { foreignKey: 'restauranteId' });
Reserva.belongsTo(Menu, { foreignKey: 'menuId' }); // Añadir relación con Menu

module.exports = Reserva;