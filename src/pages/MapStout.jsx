import React from 'react';
import AnimatedBackground from "../fondos/burbujas";

const MapStout = () => {
    return (
    <div>
        <h1 className="w-screen text-center text-2xl font-bold mb-4">Las mejores Stout</h1>
  
        <iframe
          src="https://api.maptiler.com/maps/c20003dc-0ea8-4133-97d1-61bb7ad9db36/?key=1gZy5YEqYO0msMp0pasS#1.0/32.6327/-115.478" // Reemplaza con tu URL del iframe
          width="100%"
          height="100vh" // Puedes ajustar la altura según tus necesidades
          style={{ border: "none" }} // Para quitar el borde del iframe
          title="Mapa Stout"
        />
        
        <div className="absolute top-0 left-0 w-full h-full z-[-1]">
          <AnimatedBackground />
        </div>
      </div>
    );
  };
  
  export default MapStout;