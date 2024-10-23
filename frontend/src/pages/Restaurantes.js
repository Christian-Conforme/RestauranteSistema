import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Restaurante.css';

const Restaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const response = await axios.get('/restaurantes');
        setRestaurantes(response.data);
      } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
      }
    };

    fetchRestaurantes();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const restaurantesFiltrados = restaurantes.filter(restaurante =>
    restaurante.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 style={{ color: 'blue', textAlign: 'center' }}>Restaurantes Disponibles</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Filtrar por nombre"
          value={filtro}
          onChange={handleFiltroChange}
        />
        <div className="row">
          {restaurantesFiltrados.map(restaurante => (
            <div key={restaurante.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{restaurante.nombre}</h5>
                  <p className="card-text">{restaurante.direccion}</p>
                  <p className="card-text">{restaurante.tipoCocina}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/restaurantes/${restaurante.id}`)}
                  >
                    Ver Menú
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-secondary mt-4" onClick={() => navigate('/reservas')}>
          Regresar a Reservas
        </button>
      </div>
    </div>
  );
};

export default Restaurantes;