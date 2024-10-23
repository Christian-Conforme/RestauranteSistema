import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
    telefono: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/usuarios/register', formData);
      setMessage('Registro exitoso');
      navigate('/login');
    } catch (error) {
      setMessage('Error en el registro');
      console.error('Error en el registro:', error.response ? error.response.data : error.message);
    }
  };

  return (
<div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Registrarse</button>
        </div>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;