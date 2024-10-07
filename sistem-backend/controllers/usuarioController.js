const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
// Función para registrar un usuario
exports.registrarse = async (req, res) => {
    const { nombre, email, contraseña, telefono } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const usuario = await Usuario.create({ nombre, email, contraseña: hashedPassword, telefono });
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
};
// Función para iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { email, contraseña } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: usuario.id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
//Funcion para resetear la contraseña
exports.resetearContraseña = async (req, res) => {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        await Usuario.update({ contraseña: hashedPassword }, { where: { email } });
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar contraseña' });
    }
};
//Funcion para obtener re