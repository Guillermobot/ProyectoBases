import React, { useState, useEffect, useRef } from "react";

export default function AvernoPage() {
  const cervezaRef = useRef(null);
  const comidaRef = useRef(null);
  const merchRef = useRef(null);

  const [cervezas, setCervezas] = useState([]); // Estado para almacenar las cervezas
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetching data when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/cervezas/3`) // Aquí se usa el ID 1 para Averno
      .then((response) => response.json())
      .then((data) => {
        setCervezas(data); // Guardamos las cervezas en el estado
        setLoading(false); // Detenemos el estado de carga
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setError(
          "No se pudieron cargar los datos. Intente nuevamente más tarde."
        );
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

  return (
    <div className="relative min-h-screen w-screen bg-zinc-900 bg-cover bg-center text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 z-0"></div>
      <div className="relative z-10">
        {/* Header Image */}
        <div className="relative h-[300px] w-full">
          <img
            src="/images/avernocc.jpg"
            alt="Averno Cervecería"
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
          <button
            onClick={() => scrollToSection(comidaRef)}
            className="flex-1 py-3 px-4 bg-[#A67C52] text-white border-none rounded-lg cursor-pointer text-xl font-bold hover:bg-[#8B6642] transition-colors"
          >
            Comida
          </button>
          <button
            onClick={() => scrollToSection(merchRef)}
            className="flex-1 py-3 px-4 bg-[#A67C52] text-white border-none rounded-lg cursor-pointer text-xl font-bold hover:bg-[#8B6642] transition-colors"
          >
            Merch
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="max-w-4xl mx-auto p-4 space-y-8">
          {/* Cervezas Section */}
          <div ref={cervezaRef}>
            <h2 className="text-3xl font-bold mb-4 text-amber-500">Cervezas</h2>
            {cervezas.map((cerveza, index) => (
              <div
                key={index}
                className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden mb-4"
              >
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-bold mb-2">{cerveza.nombre}</h3>
                  <p className="text-gray-200 text-lg">
                    Estilo: {cerveza.estilo}
                  </p>
                  <p className="text-gray-200 text-lg">Tipo: {cerveza.tipo}</p>
                  <p className="text-gray-200 text-lg">
                    Alcohol: {cerveza.porcentaje_alcohol}%
                  </p>
                  <p className="text-gray-200 text-lg">
                    Precio: ${cerveza.precio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
