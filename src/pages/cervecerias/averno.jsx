import React, { useState, useEffect, useRef } from "react";

export default function AvernoPage() {
  const cervezaRef = useRef(null);
  const bebidaRef = useRef(null);

  const [cervezas, setCervezas] = useState([]);
  const [bebidas, setBebidas] = useState([]);
  const [mostrarCervezas, setMostrarCervezas] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cervezasResponse, bebidasResponse] = await Promise.all([
          fetch("http://localhost:3000/cervezas/3"),
          fetch("http://localhost:3000/bebidas/3"),
        ]);

        const cervezasData = await cervezasResponse.json();
        const bebidasData = await bebidasResponse.json();

        setCervezas(cervezasData);
        setBebidas(bebidasData);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError(
          "No se pudieron cargar los datos. Intente nuevamente más tarde."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">Cargando...</div>;
  }

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
            onClick={() => {
              scrollToSection(cervezaRef);
              setMostrarCervezas(true);
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
              scrollToSection(bebidaRef);
              setMostrarCervezas(false);
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

        {/* Scrollable Content */}
        <div className="max-w-4xl mx-auto p-4 space-y-8">
          {/* Cervezas Section */}
          <div ref={cervezaRef}>
            <h2 className="text-3xl font-bold mb-4 text-amber-500">
              {mostrarCervezas ? "Cervezas" : "Bebidas"}
            </h2>
            {mostrarCervezas
              ? cervezas.map((cerveza, index) => (
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
                      <p className="text-gray-200 text-lg">
                        Tipo: {cerveza.tipo}
                      </p>
                      <p className="text-gray-200 text-lg">
                        Alcohol: {cerveza.porcentaje_alcohol}%
                      </p>
                      <p className="text-gray-200 text-lg">
                        Precio: ${cerveza.precio}
                      </p>
                    </div>
                  </div>
                ))
              : bebidas.map((bebida, index) => (
                  <div
                    key={index}
                    className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden mb-4"
                  >
                    <div className="p-6 flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        {bebida.nombre}
                      </h3>
                      <p className="text-gray-200 text-lg">
                        Tipo: {bebida.tipo}
                      </p>
                      <p className="text-gray-200 text-lg">
                        Precio: ${bebida.precio}
                      </p>
                      <p className="text-gray-200 text-lg">
                        Descripción: {bebida.descripcion}
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
