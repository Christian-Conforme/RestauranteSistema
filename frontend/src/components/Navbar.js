import React from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../css/Navbar.css'; // Asegúrate de que este archivo CSS existe

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de inicio de sesión del almacenamiento local
    localStorage.removeItem('loginToken');
    
    // Redirigir a la página de inicio de sesión
=======

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the login token from local storage or cookies
    localStorage.removeItem('loginToken');
    
    // Redirect to the login page
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
    navigate('/login');
  };

  return (
<<<<<<< HEAD
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
=======
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
