const express = require('express');
const { crearReserva, cancelarReserva, verReservas } = require('../controllers/reservaController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, crearReserva);
router.delete('/:id', auth, cancelarReserva);
router.get('/usuario', auth, verReservas); // Ruta para obtener las reservas del usuario autenticado

module.exports = router;