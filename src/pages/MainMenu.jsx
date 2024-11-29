import React, { useState } from "react";
import { Home, Map, Star, Calendar, User, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../fondos/burbujas";
import { motion } from "framer-motion";

const IconButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-md transition-colors ${
      isActive
        ? "bg-amber-100 text-amber-800"
        : "text-gray-600 hover:bg-amber-50"
    }`}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

const Buttonfill = ({ label, backgroundUrl, imageUrl, onClick }) => (
  <div
    className="relative bg-cover bg-center rounded-lg shadow-md p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105"
    onClick={onClick}
    style={{
      backgroundImage: `url(${backgroundUrl})`,
      height: "180px", // Ajusta la altura según prefieras
    }}
  >
    {/* Imagen centrada */}
    <div className="w-24 h-24 mb-2 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover"
        onError={(e) => (e.target.src = "/placeholder.svg?height=96&width=96")}
      />
    </div>
    {/* Etiqueta de texto */}
    <span className="text-lg font-bold text-white text-center">{label}</span>
  </div>
);

const BeerOption = ({ label, imageUrl, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <div className="w-24 h-24 mb-2 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
      <img
        src={imageUrl}
        alt={label}
        className="w-full h-full object-cover"
        onError={(e) => (e.target.src = "/placeholder.svg?height=96&width=96")}
      />
    </div>
    <span className="text-lg font-bold text-gray-700 text-center">{label}</span>
  </div>
);

const MainMenu = () => {
  const [activeTab, setActiveTab] = useState("Inicio");
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center relative p-4">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <AnimatedBackground />
      </div>

      <nav className="w-screen  flex sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="   flex max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-amber-500">RutaBrew</span>
            <div className="flex space-x-1 md:space-x-2 overflow-x-auto">
              <IconButton
                icon={<Home size={16} />}
                label="Inicio"
                isActive={activeTab === "Inicio"}
                onClick={() => navigate("/")}
              />
              <IconButton
                icon={<Map size={16} />}
                label="Explorar"
                isActive={activeTab === "Explorar"}
                onClick={() => setActiveTab("Explorar")}
              />
              <IconButton
                icon={<Star size={16} />}
                label="Favoritos"
                isActive={activeTab === "Favoritos"}
                onClick={() => setActiveTab("Favoritos")}
              />
              <IconButton
                icon={<Calendar size={16} />}
                label="Eventos"
                isActive={activeTab === "Eventos"}
                onClick={() => setActiveTab("Eventos")}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-8 text-center">
          Explora tus cervecerias favoritas
        </h1>
        <Buttonfill
          label="Tus Favoritas"
          backgroundUrl="/images/cervezas.jpg"
          imageUrl="/images/giflogos.gif"
          onClick={() => navigate("/novedades")}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-amber-800  text-center">
          Encuentra esa cerveza
        </h1>

        <BeerOption
          label="Catalogo completo"
          imageUrl="/images/lager.png"
          onClick={() => navigate("/mapa-stout")}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-amber-800  text-center">
          Opciones extra
        </h1>

        <BeerOption
          label="Reportes"
          imageUrl="/images/reportes.jpg"
          onClick={() => navigate("/reportes")}
        />
      </main>
      <div>
        <footer className="bg-amber-800 text-amber-50 py-4 mt-8">
          <div className=" w-screen max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainMenu;
