import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../css/Dashboard.css'; // Asegúrate de crear este archivo CSS
=======
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token del localStorage
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
<<<<<<< HEAD
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
=======
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
