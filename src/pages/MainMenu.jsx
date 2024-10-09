import React, { useState } from "react";
import {
  Home,
  Map,
  Star,
  Calendar,
  User,
  UserCircle,
  Beer,
  Coffee,
  Wine,
  GlassWater,
} from "lucide-react";
import './App.css'; // Asegúrate de importar el archivo CSS

const IconButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`icon-button ${isActive ? "active" : ""}`}
  >
    {icon}
    <span className="icon-label">{label}</span>
  </button>
);

const BeerOption = ({ label, icon: Icon, onClick }) => (
  <div className="beer-option" onClick={onClick}>
    <div className="beer-icon">
      <Icon size={64} />
    </div>
    <span className="beer-label">{label}</span>
  </div>
);

const RutaBrewMenu = () => {
  const [activeTab, setActiveTab] = useState("Inicio");

  return (
    <div className="app-container">
      {/* Barra de menú */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <span className="navbar-title">RutaBrew</span>
            <div className="navbar-buttons">
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

      {/* Contenido principal */}
      <main className="main-content">
        <h1 className="main-title">¿Qué quieres degustar hoy?</h1>
        <div className="beer-options-container">
          <BeerOption
            label="Cerveza Artesanal"
            icon={Beer}
            onClick={() => console.log("Cerveza seleccionada")}
          />
          <BeerOption
            label="Café de Especialidad"
            icon={Coffee}
            onClick={() => console.log("Café seleccionado")}
          />
          <BeerOption
            label="Vino Local"
            icon={Wine}
            onClick={() => console.log("Vino seleccionado")}
          />
          <BeerOption
            label="Cócteles Artesanales"
            icon={GlassWater}
            onClick={() => console.log("Cóctel seleccionado")}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <div className="app">
      <RutaBrewMenu />
    </div>
  );
}
