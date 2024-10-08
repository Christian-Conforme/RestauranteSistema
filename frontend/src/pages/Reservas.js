import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Reserva.css';
import Dashboard from './Dashboard';
const Reservas = () => {
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    numeroPersonas: '',
    restauranteId: '',
    menuId: ''
  });
  const [restaurantes, setRestaurantes] = useState([]);
  const [menus, setMenus] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener las reservas del usuario al cargar el componente
    const fetchReservas = async () => {
      try {
        const response = await axios.get('/reservas/usuario');
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    // Obtener la lista de restaurantes
    const fetchRestaurantes = async () => {
      try {
        const response = await axios.get('/restaurantes');
        setRestaurantes(response.data);
      } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
      }
    };

    fetchReservas();
    fetchRestaurantes();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Si se selecciona un restaurante, obtener los menús para ese restaurante
    if (e.target.name === 'restauranteId') {
      const fetchMenus = async () => {
        try {
          const response = await axios.get(`/menus/${e.target.value}`);
          setMenus(response.data);
        } catch (error) {
          console.error('Error al obtener los menús:', error);
        }
      };

      fetchMenus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (menus.length === 0) {
      setMessage('No hay menús disponibles para este restaurante. Selecciona otro restaurante.');
      return;
    }
    try {
      const response = await axios.post('/reservas', formData);
      setMessage('Reserva creada exitosamente');
      setReservas([...reservas, response.data.reserva]);
    } catch (error) {
      setMessage('Error al crear la reserva');
      console.error('Error al crear la reserva:', error);
    }
  };

  const handleCancel = async (id) => {
    const confirmCancel = window.confirm('¿Está seguro de que desea cancelar esta reserva?');
    if (confirmCancel) {
      try {
        await axios.delete(`/reservas/${id}`);
        setMessage('Reserva cancelada exitosamente');
        setReservas(reservas.filter(reserva => reserva.id !== id));
      } catch (error) {
        setMessage('Error al cancelar la reserva');
        console.error('Error al cancelar la reserva:', error);
      }
    } else {
      setMessage('Cancelación de reserva abortada');
    }
  };

  const getRestauranteNombre = (id) => {
    const restaurante = restaurantes.find(rest => rest.id === id);
    return restaurante ? restaurante.nombre : 'Desconocido';
  };

  const getMenuNombre = (id) => {
    const menu = menus.find(menu => menu.id === id);
    return menu ? menu.nombre : 'Desconocido';
  };

  return (
    <div>
      <Dashboard />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2 style={{ color: 'blue', textAlign: 'center' }}>Crear Reserva</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
              <div className="form-group">
                <label htmlFor="fecha">Fecha</label>
                <input type="date" className="form-control" id="fecha" name="fecha" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input type="time" className="form-control" id="hora" name="hora" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="numeroPersonas">Número de Personas</label>
                <input type="number" className="form-control" id="numeroPersonas" name="numeroPersonas" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="restauranteId">Restaurante</label>
                <select className="form-control" id="restauranteId" name="restauranteId" onChange={handleChange} required>
                  <option value="">Selecciona un Restaurante</option>
                  {restaurantes.map(restaurante => (
                    <option key={restaurante.id} value={restaurante.id}>
                      {restaurante.nombre}
                    </option>
                  ))}
                </select>
              </div>
              {formData.restauranteId && (
                menus.length > 0 ? (
                  <div className="form-group">
                    <label htmlFor="menuId">Menú</label>
                    <select className="form-control" id="menuId" name="menuId" onChange={handleChange} required>
                      <option value="">Selecciona un Menú</option>
                      {menus.map(menu => (
                        <option key={menu.id} value={menu.id}>
                          {menu.nombre} - ${menu.precio}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p style={{ color: 'red' }}>No hay menús disponibles para este restaurante. Selecciona otro restaurante.</p>
                )
              )}
              {formData.menuId && (
                <p>Menú seleccionado: {getMenuNombre(formData.menuId)}</p>
              )}
              <button type="submit" className="btn btn-primary">Crear Reserva</button>
            </form>
            <p style={{ color: message.includes('exitosamente') ? 'green' : 'red' }}>{message}</p>
          </div>
          <div className="col-md-6">
            <h2 style={{ color: 'blue', textAlign: 'center' }}>Restaurantes Disponibles</h2>
            <ul className="list-group">
              {restaurantes.map(restaurante => (
                <li key={restaurante.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {restaurante.nombre}
                  <button className="btn btn-info" onClick={() => navigate(`/restaurantes/${restaurante.id}`)}>Ver Detalles</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h2 style={{ color: 'blue', textAlign: 'center' }}>Mis Reservas</h2>
        <ul className="list-group" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {reservas.map(reserva => (
            <li key={reserva.id} className="list-group-item d-flex justify-content-between align-items-center">
              {reserva.fecha} {reserva.hora} - {reserva.numeroPersonas} personas
              <div>
                <p>Restaurante: {getRestauranteNombre(reserva.restauranteId)}</p>
                <p>Menú: {getMenuNombre(reserva.menuId)}</p>
              </div>
              <button className="btn btn-danger" onClick={() => handleCancel(reserva.id)}>Cancelar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reservas;
