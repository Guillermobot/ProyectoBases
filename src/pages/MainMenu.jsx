import React, { useState } from "react";
import { Home, Map, Star, Calendar, User, UserCircle } from "lucide-react";

const IconButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1 h-auto py-2 px-3 rounded-md transition-colors ${
      isActive ? "bg-amber-100 text-amber-800" : "text-gray-600 hover:bg-amber-50"
    }`}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

const BeerOption = ({ label, imageUrl, onClick }) => (
  <div
    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center transition-all hover:scale-105 cursor-pointer"
    onClick={onClick}
  >
    <div className="w-32 h-32 mb-4 overflow-hidden rounded-full">
      <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
    </div>
    <span className="text-lg font-bold text-gray-700">{label}</span>
  </div>
);

const MainMenu = () => {
  const [activeTab, setActiveTab] = useState("Inicio");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 to-amber-100">
      <nav className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-amber-500">RutaBrew</span>
            <div className="flex space-x-2">
              <IconButton
                icon={<Home size={20} />}
                label="Inicio"
                isActive={activeTab === "Inicio"}
                onClick={() => setActiveTab("Inicio")}
              />
              <IconButton
                icon={<Map size={20} />}
                label="Explorar"
                isActive={activeTab === "Explorar"}
                onClick={() => setActiveTab("Explorar")}
              />
              <IconButton
                icon={<Star size={20} />}
                label="Favoritos"
                isActive={activeTab === "Favoritos"}
                onClick={() => setActiveTab("Favoritos")}
              />
              <IconButton
                icon={<Calendar size={20} />}
                label="Eventos"
                isActive={activeTab === "Eventos"}
                onClick={() => setActiveTab("Eventos")}
              />
              <IconButton
                icon={<User size={20} />}
                label="Perfil"
                isActive={activeTab === "Perfil"}
                onClick={() => setActiveTab("Perfil")}
              />
              <IconButton
                icon={<UserCircle size={20} />}
                label="Invitado"
                isActive={activeTab === "Invitado"}
                onClick={() => setActiveTab("Invitado")}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-amber-800 mb-8 text-center">¿Qué quieres tomar hoy?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BeerOption
            label="Cerveza Artesanal"
            imageUrl="/placeholder.svg?height=128&width=128"
            onClick={() => console.log("Cerveza seleccionada")}
          />
          <BeerOption
            label="Stout"
            imageUrl="/placeholder.svg?height=128&width=128"
            onClick={() => console.log("Café seleccionado")}
          />
          <BeerOption
            label="Lager"
            imageUrl="/placeholder.svg?height=128&width=128"
            onClick={() => console.log("Lager seleccionado")}
          />
          <BeerOption
            label="Temporada"
            imageUrl="/placeholder.svg?height=128&width=128"
            onClick={() => console.log("Recomendacion seleccionada")}
          />
        </div>
      </main>

      <footer className="bg-amber-800 text-amber-50 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainMenu;