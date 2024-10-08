import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Dashboard.css'; // Asegúrate de crear este archivo CSS

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <div className="dashboard-container"> {/* Contenedor principal */}
      <nav className="navbar"> {/* Barra de navegación */}
        <h2>Gestion de restaurante</h2> {/* Título de la aplicación */}
        <nav>
        <li><a href="/reservas">Home</a></li>
        </nav>
        <div className="navbar-links"> {/* Contenedor para enlaces y botón */}
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
