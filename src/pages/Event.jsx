import React from "react";
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "../fondos/burbujas"; // Fondo animado

// Definimos el componente ListaCard
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

const Novedades = () => {
  const navigate = useNavigate();

  // Lista de novedades con nombre, descripción y precio
  const novedades = [
    {
      title: "Nueva Stout Imperial",
      description: "Descubre el sabor de nuestra última creación.",
      price: "10.99",
      onClick: () => navigate('/stout-imperial')
    },
    {
      title: "Festival de Cerveza",
      description: "Únete a nosotros para celebrar en grande.",
      price: "20.00",
      onClick: () => navigate('/festival-cerveza')
    },
    // Puedes añadir más novedades aquí con su nombre, descripción y precio
  ];

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
        
        {/* Lista de novedades */}
        <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {novedades.map((novedad, index) => (
            <ListaCard
              key={index}
              title={novedad.title}
              description={novedad.description}
              price={novedad.price}
              onClick={novedad.onClick}
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

export default Novedades;
