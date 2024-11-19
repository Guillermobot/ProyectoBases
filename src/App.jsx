import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu.jsx";
import MapMexicali from "./pages/MapMexicali.jsx"; 
import MapStout from "./pages/MapStout.jsx";
import Novedades from "./pages/Novedades.jsx";
import Eventos from "./pages/Event.jsx";
import CervezasTemporales from "./pages/CervezasTemporada.jsx";
import Sarmiento from  "./pages/cervecerias/sarmiento.jsx";
import Averno from "./pages/cervecerias/averno.jsx";
import Wendlandt from "./pages/cervecerias/wendlandt.jsx";
import Reportes from "./pages/ReportesCervecerias.jsx";
import Icono from "./pages/cervecerias/icono.jsx";
export default function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/mapa-mexicali" element={<MapMexicali />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/temporada" element={<CervezasTemporales />} />
        <Route path="/eventos" element={<Eventos/>} />
        <Route path="/sarmiento" element={<Sarmiento/>} />
        <Route path="/wendlandt" element={<Wendlandt/>} />
        <Route path="/averno" element={<Averno/>} />
        <Route path="/mapa-stout" element={<MapStout />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/icono" element={<Icono />} />
       
      </Routes>
    </Router>
  );
}