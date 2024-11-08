import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "../../fondos/burbujas";  // Fondo animado (si tienes esto configurado)

const ListaCard = ({ title, description, price, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <h3 className="text-lg font-bold text-gray-700 text-center">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
    <p className="text-lg font-semibold text-gray-900 text-center">${price}</p>
  </div>
);

const SarmientoPage = () => {
  const navigate = useNavigate();
  const [novedades, setNovedades] = useState([]);  // Estado para almacenar los datos
  const [loading, setLoading] = useState(true);  // Estado para controlar la carga
  const [error, setError] = useState(null);  // Estado para manejar errores

  useEffect(() => {
    // Realizar la solicitud a la API para obtener los datos
    fetch('http://localhost:3000/menu-items')  // Cambia la URL si tu servidor está en otro puerto
      .then((response) => response.json())
      .then((data) => {
        setNovedades(data);  // Actualizar el estado con los datos obtenidos
        setLoading(false);    // Detener el estado de carga
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setError('No se pudieron cargar los datos. Intente nuevamente más tarde.');
        setLoading(false);    // Detener el estado de carga
      });
  }, []);  // El arreglo vacío asegura que solo se ejecute una vez cuando el componente se monta

  if (loading) {
    return <div>Cargando...</div>;  // Mostrar "Cargando..." mientras se obtienen los datos
  }

  if (error) {
    return <div>{error}</div>;  // Mostrar mensaje de error si hay un problema
  }

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative p-4">
      {/* Fondo animado */}
      <div className="w-screen absolute top-0 left-0 w-full h-full z-[-1]">
        <AnimatedBackground />
      </div>

      {/* Encabezado */}
      <header className="w-screen flex sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="flex max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-amber-500">RutaBrew</span>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="w-screen flex-grow w-full px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 text-center">Solo Por Tiempo Limitado</h1>

        {/* Lista de novedades (cervezas) */}
        <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {novedades.map((novedad) => (
            <ListaCard
              key={novedad.nombre}        // Usar nombre como clave (si es único, mejor que usar índice)
              title={novedad.nombre}        // Asumimos que la columna se llama 'nombre' en la base de datos
              description={novedad.descripcion}  // 'descripcion'
              price={novedad.precio}        // 'precio'
              onClick={() => navigate(`/beer/${novedad.nombre}`)} // Redirige al detalle de la cerveza
            />
          ))}
        </div>
      </main>

      {/* Pie de página */}
      <footer className="bg-amber-800 text-amber-50 py-4 mt-8">
        <div className="w-screen max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default SarmientoPage;
