const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Restaurante = require('./Restaurante');

const Menu = sequelize.define('Menu', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'menus'
});

Menu.belongsTo(Restaurante, { foreignKey: 'restauranteId' });

module.exports = Menu;