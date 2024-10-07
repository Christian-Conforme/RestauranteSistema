const Reserva = require('../models/Reserva');

exports.crearReserva = async (req, res) => {
    const { fecha, hora, numeroPersonas, restauranteId } = req.body;
    try {
        const reserva = await Reserva.create({ fecha, hora, numeroPersonas, usuarioId: req.usuario.id, restauranteId });
        res.status(201).json({ message: 'Reserva creada exitosamente', reserva });
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};

exports.cancelarReserva = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        await reserva.destroy();
        res.status(200).json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        res.status(500).json({ error: 'Error al cancelar la reserva' });
    }
};

exports.verReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({ where: { usuarioId: req.usuario.id } });
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};