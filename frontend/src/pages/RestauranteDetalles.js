import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
// import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';
import '../css/RestauranteDetalle.css';
=======
import Navbar from '../components/Navbar';
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d

const RestauranteDetalles = () => {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState(null);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const response = await axios.get(`/restaurantes/${id}`);
        setRestaurante(response.data);
      } catch (error) {
        console.error('Error al obtener el restaurante:', error);
      }
    };

    const fetchMenus = async () => {
      try {
        const response = await axios.get(`/menus/${id}`);
        setMenus(response.data);
      } catch (error) {
        console.error('Error al obtener los menús:', error);
      }
    };

    fetchRestaurante();
    fetchMenus();
  }, [id]);

  if (!restaurante) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
<<<<<<< HEAD
      <Dashboard />
=======
      <Navbar />
>>>>>>> 43a855a9e5460cd4a82558a0bf2c9013f12d243d
      <div className="container mt-4">
        <h2 style={{ color: 'blue', textAlign: 'center' }}>{restaurante.nombre}</h2>
        <p style={{ textAlign: 'center' }}>{restaurante.direccion}</p>
        <p style={{ textAlign: 'center' }}>{restaurante.tipoCocina}</p>
        <h3 style={{ color: 'blue', textAlign: 'center' }}>Menús Disponibles</h3>
        <div className="row">
          {menus.map(menu => (
            <div key={menu.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{menu.nombre}</h5>
                  <p className="card-text">Precio: ${menu.precio}</p>
                  <p className="card-text">{menu.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary mt-4" onClick={() => navigate('/restaurantes')}>
          Regresar a Restaurantes
        </button>
      </div>
    </div>
  );
};

export default RestauranteDetalles;