import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css'; // Asegúrate de que este archivo CSS existe

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de inicio de sesión del almacenamiento local
    localStorage.removeItem('loginToken');
    
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <nav className="navbar"> {/* Agregar una clase para estilos */}
      <div className="navbar-container"> {/* Contenedor para los elementos de la navbar */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
        <h1 className="navbar-logo">Mi Aplicación</h1> {/* Logo o nombre de la aplicación */}
        <ul className="navbar-links"> {/* Lista de enlaces */}
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
