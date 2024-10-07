const Menu = require('../models/Menu');

exports.crearMenu = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;
    try {
        const menu = await Menu.create({ nombre, descripcion, precio, restauranteId });
        res.status(201).json({ message: 'Menú creado exitosamente', menu });
    } catch (error) {
        console.error('Error al crear el menú:', error);
        res.status(500).json({ error: 'Error al crear el menú' });
    }
};

exports.verMenus = async (req, res) => {
    const { restauranteId } = req.params;
    try {
        const menus = await Menu.findAll({ where: { restauranteId } });
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error al obtener los menús:', error);
        res.status(500).json({ error: 'Error al obtener los menús' });
    }
};

exports.verMenuPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error al obtener el menú:', error);
        res.status(500).json({ error: 'Error al obtener el menú' });
    }
};

exports.actualizarMenu = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        menu.nombre = nombre;
        menu.descripcion = descripcion;
        menu.precio = precio;
        await menu.save();
        res.status(200).json({ message: 'Menú actualizado exitosamente', menu });
    } catch (error) {
        console.error('Error al actualizar el menú:', error);
        res.status(500).json({ error: 'Error al actualizar el menú' });
    }
};

exports.eliminarMenu = async (req, res) => {
    const { id } = req.params;
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            return res.status(404).json({ error: 'Menú no encontrado' });
        }
        await menu.destroy();
        res.status(200).json({ message: 'Menú eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el menú:', error);
        res.status(500).json({ error: 'Error al eliminar el menú' });
    }
};