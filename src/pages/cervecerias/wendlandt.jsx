import React, { useState, useEffect, useRef } from 'react';

export default function WendlatndtPage() {
  const cervezaRef = useRef(null);

  const [novedades, setNovedades] = useState([]); // Estado para almacenar los artículos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetching data when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/cervezas')
      .then((response) => response.json())
      .then((data) => {
        setNovedades(data); // Guardamos los artículos en el estado
        setLoading(false); // Detenemos el estado de carga
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        setError('No se pudieron cargar los datos. Intente nuevamente más tarde.');
        setLoading(false);
      });
  }, []);

  // Si está cargando, mostrar el mensaje
  if (loading) {
    return <div className="text-center text-xl">Cargando...</div>;
  }

  // Si hay un error, mostrar mensaje de error
  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  // Lista de secciones con sus respectivas propiedades usando los datos obtenidos
  const sections = novedades.map((item) => ({
    ref: cervezaRef, // Determina la referencia
    title: item.nombre,
    type: item.tipo,
    price: item.precio,
  }));

  return (
    <div 
      className="min-h-screen w-screen bg-zinc-900 bg-cover bg-center text-white font-sans"
      style={{
        backgroundImage: ""
      }}
    >
      {/* Header Image and Logo */}
      <div className="relative h-[300px] w-full">
        <img
          src="/images/WENDLANDT.jpg"
          alt="El Sarmiento Tap Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 p-2 bg-transparent sticky top-0 z-10 max-w-4xl mx-auto">
        <button
          onClick={() => scrollToSection(cervezaRef)}
          className="flex-1 py-3 px-4 bg-[#A67C52] text-white border-none rounded-lg cursor-pointer text-xl font-bold hover:bg-[#8B6642] transition-colors"
        >
          Cervezas
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Renderizado de cada sección dinámicamente */}
        {sections.map((section, index) => (
          <div ref={section.ref} key={index} className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="p-6 flex-1">
              <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-200 text-lg">Tipo: {section.type}</p>
              <p className="text-gray-200 text-lg">Precio: ${section.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
