const express = require('express');
const {
    crearRestaurante,
    verRestaurantes,
    verRestaurantePorId,
    actualizarRestaurante,
    eliminarRestaurante
} = require('../controllers/restauranteController');
const router = express.Router();

router.post('/', crearRestaurante);
router.get('/', verRestaurantes);
router.get('/:id', verRestaurantePorId);
router.put('/:id', actualizarRestaurante);
router.delete('/:id', eliminarRestaurante);

module.exports = router;