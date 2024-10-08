import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: ''
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
      const response = await axios.post('/usuarios/login', formData);
      localStorage.setItem('token', response.data.token);
      setMessage('Inicio de sesión exitoso');
      // Redirige a la página de reservas después de un breve retraso para mostrar el mensaje
      setTimeout(() => {
        navigate('/reservas');
      }, 1000);
    } catch (error) {
      setMessage('Error en el inicio de sesión');
      console.error('Error en el inicio de sesión:', error);
    }
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p>{message}</p>
      <button onClick={() => navigate('/register')}>Registrarse</button>
    </div>
  );
};

export default Login;