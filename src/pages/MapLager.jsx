import React from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';

const lagerBreweries = [
    {
      name: "Wendlandt",
      position: [32.65226191606933, -115.41052625795349],
      logo: "/images/wendlandt.png",
    },
    {
      name: "Sarmiento",
      position: [32.63104899395581, -115.46413952695467],
      logo: "/images/wendlandt.png",
    },
  ];
  

const MapLager = () => {
    return (
      <div>
        <h1 className="text-center text-2xl font-bold mb-4">Cervecerías Lager en Mexicali</h1>
        <Map
          defaultCenter={[32.6327, -115.478]} // Centro inicial en Mexicali
          defaultZoom={13} // Nivel de zoom
          style={{ width: '100%', height: '100vh' }} // Estilo del mapa
        >
          {lagerBreweries.map((brewery, index) => (
            <Marker key={index} anchor={brewery.position}>
              <Overlay anchor={brewery.position} offset={[0, 20]}>
                <div style={{ textAlign: 'center' }}>
                  <img src={brewery.logo} alt={brewery.name} style={{ width: '50px' }} />
                  <h3>{brewery.name}</h3>
                </div>
              </Overlay>
            </Marker>
          ))}
        </Map>
      </div>
    );
  };
  
  export default MapLager;
