import React, { useState, useEffect, useRef } from "react";

export default function IconoPage() {
  const cervezaRef = useRef(null);
  const comidaRef = useRef(null);
  const merchRef = useRef(null);

  const [cervezas, setCervezas] = useState([]);
  const [bebidas, setBebidas] = useState([]); // Estado para las bebidas
  const [mostrarCervezas, setMostrarCervezas] = useState(true); // Estado para alternar entre Cervezas y Bebidas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("http://localhost:3000/cervezas/4")
      .then((response) => response.json())
      .then((data) => {
        setCervezas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
        setError(
          "No se pudieron cargar los datos. Intente nuevamente más tarde."
        );
        setLoading(false);
      });

    fetch("http://localhost:3000/bebidas/4") // Aquí agregamos la llamada para las bebidas
      .then((response) => response.json())
      .then((data) => {
        setBebidas(data);
      })
      .catch((error) => {
        console.error("Error al obtener las bebidas:", error);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="relative min-h-screen w-screen bg-zinc-900 bg-cover bg-center text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 z-0">{/* Header Image */}</div>
      <div className="relative z-10">
        <div className="relative h-[300px] w-full">
          <img
            src="/images/icono.jpg" // Cambiar la imagen de encabezado a una para la cervecería Icono
            alt="Icono Cervecería"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 p-2 bg-transparent sticky top-0 z-10 max-w-4xl mx-auto">
          <button
            onClick={() => {
              scrollToSection(cervezaRef);
              setMostrarCervezas(true); // Mostrar Cervezas
            }}
            className={`flex-1 py-3 px-4 text-white border-none rounded-lg cursor-pointer text-xl font-bold transition-colors ${
              mostrarCervezas
                ? "bg-[#8B6642]"
                : "bg-[#A67C52] hover:bg-[#8B6642]"
            }`}
          >
            Cervezas
          </button>
          <button
            onClick={() => {
              scrollToSection(comidaRef);
              setMostrarCervezas(false); // Mostrar Bebidas
            }}
            className={`flex-1 py-3 px-4 text-white border-none rounded-lg cursor-pointer text-xl font-bold transition-colors ${
              !mostrarCervezas
                ? "bg-[#8B6642]"
                : "bg-[#A67C52] hover:bg-[#8B6642]"
            }`}
          >
            Bebidas
          </button>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-8">
          {/* Cervezas Section */}
          {mostrarCervezas && (
            <div ref={cervezaRef}>
              <h2 className="text-3xl font-bold mb-4 text-amber-500">
                Cervezas
              </h2>
              {cervezas.map((cerveza, index) => (
                <div
                  key={index}
                  className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden mb-4"
                >
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold mb-2">
                      {cerveza.nombre}
                    </h3>
                    <p className="text-gray-200 text-lg">
                      Estilo: {cerveza.estilo}
                    </p>
                    <p className="text-gray-200 text-lg">ABV: {cerveza.abv}%</p>
                    <p className="text-gray-200 text-lg">
                      {cerveza.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bebidas Section */}
          {!mostrarCervezas && (
            <div ref={comidaRef}>
              <h2 className="text-3xl font-bold mb-4 text-amber-500">
                Bebidas
              </h2>
              {bebidas.map((bebida, index) => (
                <div
                  key={index}
                  className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden mb-4"
                >
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold mb-2">{bebida.nombre}</h3>
                    <p className="text-gray-200 text-lg">Tipo: {bebida.tipo}</p>
                    <p className="text-gray-200 text-lg">
                      Descripción: {bebida.descripcion}
                    </p>
                    <p className="text-gray-200 text-lg">
                      Precio: ${bebida.precio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
