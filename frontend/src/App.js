import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Reservas from './pages/Reservas';
import Restaurantes from './pages/Restaurantes';
import RestauranteDetalles from './pages/RestauranteDetalles';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Verificar si el usuario está autenticado

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute component={Dashboard} isAuthenticated={isAuthenticated} />} />
        <Route path="/reservas" element={<PrivateRoute component={Reservas} isAuthenticated={isAuthenticated} />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/restaurantes/:id" element={<RestauranteDetalles />} />
      </Routes>
    </Router>
  );
}

export default App;