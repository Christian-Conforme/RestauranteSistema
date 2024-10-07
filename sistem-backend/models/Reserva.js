const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Restaurante = require('./Restaurante');

const Reserva = sequelize.define('Reserva', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
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

module.exports = Reserva;