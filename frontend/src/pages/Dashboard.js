import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;