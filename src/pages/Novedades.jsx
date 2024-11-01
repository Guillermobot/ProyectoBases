// Novedades.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from "../fondos/burbujas"; // Usa el mismo fondo animado si quieres

const NovedadCard = ({ title, imageUrl, description, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <div className="w-24 h-24 mb-2 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
      <img src={imageUrl} alt={title} className="w-full h-full object-cover" onError={(e) => e.target.src = '/placeholder.svg?height=96&width=96'} />
    </div>
    <h3 className="text-lg font-bold text-gray-700 text-center">{title}</h3>
    <p className="text-sm text-gray-600 text-center">{description}</p>
  </div>
);

const Novedades = () => {
  const navigate = useNavigate();

  // Lista de novedades con título, imagen, y descripción
  const novedades = [
    {
      title: "Nueva Stout Imperial",
      imageUrl: "/images/stout-imperial.png",
      description: "Descubre el sabor de nuestra última creación.",
      onClick: () => navigate('/stout-imperial')
    },
    {
      title: "Festival de Cerveza",
      imageUrl: "/images/festival.png",
      description: "Únete a nosotros para celebrar en grande.",
      onClick: () => navigate('/festival-cerveza')
    },
    // Puedes añadir más novedades aquí
  ];

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative p-4">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <AnimatedBackground />
      </div>
      <header className="w-screen flex sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="flex max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-amber-500">RutaBrew</span>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 text-center">Solo Por Tiempo Limitado</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {novedades.map((novedad, index) => (
            <NovedadCard
              key={index}
              title={novedad.title}
              imageUrl={novedad.imageUrl}
              description={novedad.description}
              onClick={novedad.onClick}
            />
          ))}
        </div>
      </main>

      <footer className="bg-amber-800 text-amber-50 py-4 mt-8">
        <div className="w-screen max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Novedades;
