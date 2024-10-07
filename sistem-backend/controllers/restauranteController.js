const Restaurante = require('../models/Restaurante');

exports.crearRestaurante = async (req, res) => {
    const { nombre, direccion, tipoCocina, calificacion } = req.body;
    try {
        const restaurante = await Restaurante.create({ nombre, direccion, tipoCocina, calificacion });
        res.status(201).json({ message: 'Restaurante creado exitosamente', restaurante });
    } catch (error) {
        console.error('Error al crear el restaurante:', error);
        res.status(500).json({ error: 'Error al crear el restaurante' });
    }
};

exports.verRestaurantes = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.status(200).json(restaurantes);
    } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).json({ error: 'Error al obtener los restaurantes' });
    }
};

exports.verRestaurantePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ error: 'Restaurante no encontrado' });
        }
        res.status(200).json(restaurante);
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).json({ error: 'Error al obtener el restaurante' });
    }
};

exports.actualizarRestaurante = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, tipoCocina, calificacion } = req.body;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ error: 'Restaurante no encontrado' });
        }
        restaurante.nombre = nombre;
        restaurante.direccion = direccion;
        restaurante.tipoCocina = tipoCocina;
        restaurante.calificacion = calificacion;
        await restaurante.save();
        res.status(200).json({ message: 'Restaurante actualizado exitosamente', restaurante });
    } catch (error) {
        console.error('Error al actualizar el restaurante:', error);
        res.status(500).json({ error: 'Error al actualizar el restaurante' });
    }
};

exports.eliminarRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).json({ error: 'Restaurante no encontrado' });
        }
        await restaurante.destroy();
        res.status(200).json({ message: 'Restaurante eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar el restaurante:', error);
        res.status(500).json({ error: 'Error al eliminar el restaurante' });
    }
};