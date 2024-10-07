const express = require('express');
const {
    crearMenu,
    verMenus,
    verMenuPorId,
    actualizarMenu,
    eliminarMenu
} = require('../controllers/menuController');
const router = express.Router();

router.post('/', crearMenu);
router.get('/:restauranteId', verMenus);
router.get('/detalle/:id', verMenuPorId);
router.put('/:id', actualizarMenu);
router.delete('/:id', eliminarMenu);

module.exports = router;