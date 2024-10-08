import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;