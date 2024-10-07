const express = require('express');
const { registrarse, iniciarSesion, resetearContraseña } = require('../controllers/usuarioController'); // Asegúrate de que la importación sea correcta
const router = express.Router();

router.post('/register', registrarse); // Asegúrate de que la función de callback esté definida
router.post('/login', iniciarSesion); // Asegúrate de que la función de callback esté definida
router.post('/reset-password', resetearContraseña); // Asegúrate de que la función de callback esté definida
module.exports = router;
