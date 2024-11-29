import React, { useState, useEffect } from "react";
import {
  Home,
  Map,
  Star,
  Calendar,
  User,
  UserCircle,
  Check,
  X,
} from "lucide-react";
import AnimatedBackground from "../fondos/burbujas";

const StoutMenu = () => {
  const [selectedCerveceria, setSelectedCerveceria] = useState("");
  const [cervezas, setCervezas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Datos de cervecerías
  const cervecerias = ["Averno", "Wendlandt", "Sarmiento", "Icono"];

  // Función para obtener la disponibilidad de cervezas
  const getCervezasDisponibilidad = (cerveceria) => {
    // Mapeo de cervecerías a sus IDs
    const cerveceriaIds = {
      Averno: 3,
      Wendlandt: 1,
      Sarmiento: 2,
      Icono: 4,
    };

    const cerveceriaId = cerveceriaIds[cerveceria];

    if (!cerveceriaId) {
      setError("Cervecería no encontrada");
      return;
    }

    setLoading(true);
    setError("");

    fetch(`http://localhost:3000/cervezas/disponibilidad/${cerveceriaId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
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
  };

  // Función que maneja el cambio de cervecería
  const handleCerveceriaChange = (event) => {
    const selected = event.target.value;
    setSelectedCerveceria(selected);
    getCervezasDisponibilidad(selected);
  };

  // Función para exportar la lista de cervezas a TXT
  const exportToTXT = () => {
    let txtContent = "Lista de Cervezas\n\n";

    cervezas.forEach((cerveza) => {
      txtContent += `ID: ${cerveza.id}\n`;
      txtContent += `Nombre: ${cerveza.nombre}\n`;
      txtContent += `Tipo: ${cerveza.tipo}\n`;
      txtContent += `Precio: $${cerveza.precio}\n`;
      txtContent += `Disponibilidad: ${cerveza.disponibilidad}\n\n`;
    });

    // Crear un blob con el contenido TXT
    const blob = new Blob([txtContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cervezas.txt";
    link.click();
  };

  return (
    <div className="relative flex flex-col min-h-screen w-screen overflow-x-hidden bg-zinc-900 text-white">
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="w-screen flex sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
          <div className="flex max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <span className="text-2xl font-bold text-amber-500">
                RutaBrew
              </span>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-500 mb-8 text-center">
            Disponibilidad de Cervezas
          </h1>

          <div className="mb-8">
            <select
              value={selectedCerveceria}
              onChange={handleCerveceriaChange}
              className="w-full p-2 bg-zinc-800 text-white border border-amber-500 rounded-md"
            >
              <option value="">Selecciona una cervecería</option>
              {cervecerias.map((cerveceria, index) => (
                <option key={index} value={cerveceria}>
                  {cerveceria}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center text-xl">Cargando...</div>
          ) : error ? (
            <div className="text-center text-xl text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {selectedCerveceria &&
                cervezas.map((cerveza) => (
                  <div key={cerveza.id} className="bg-zinc-800 p-4 rounded-md">
                    <h2 className="text-xl font-bold text-amber-500">
                      {cerveza.nombre}
                    </h2>
                    <p className="text-sm text-gray-300">{cerveza.tipo}</p>
                    <p className="text-lg text-amber-500">${cerveza.precio}</p>
                    <div
                      className={`mt-2 p-2 rounded-md ${
                        cerveza.disponibilidad === "disponible"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {cerveza.disponibilidad}
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={exportToTXT}
              className="px-6 py-3 bg-amber-500 text-white font-bold rounded-md shadow-md"
            >
              Exportar a TXT
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StoutMenu;
