import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu.jsx";
import MapMexicali from "./pages/MapMexicali.jsx"; 
import MapStout from "./pages/MapStout.jsx";
import MapLager from "./pages/MapLager.jsx";


export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/mapa-mexicali" element={<MapMexicali />} /> {/* Nueva ruta para el mapa */}
        <Route path="/mapa-stout" element={<MapStout />} />
        <Route path="/mapa-lager" element={<MapLager />} />
      </Routes>
    </Router>
  );
}