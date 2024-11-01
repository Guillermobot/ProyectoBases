import React, { useEffect, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import AnimatedBackground from "../fondos/burbujas";
import { useParams } from 'react-router-dom';

const allBreweries = {
    ipa: [
      { name: 'Cervecería Sarmiento', coordinates: [-115.46411941035808, 32.63104447625584] },
      { name: 'Wendlandt', coordinates: [-115.41052625795349, 32.65226191606933] },
    ],
    stout: [
      { name: 'Cervecería Fauna', coordinates: [ -115.47369392771779,32.665349028560044] },
      { name: 'Cervecería Mandala', coordinates: [-115.43793347604898,32.63941086841683] },
    ],
    lager: [
      { name: 'Cervecería Icono', coordinates: [-115.47135649857671,32.66043828033575 ] },
      { name: 'Cervecería Media Sangre', coordinates: [-115.45202913538353,32.65073364373979 ] },
    ],
    seltzer: [
        { name: 'Cervecería Averno', coordinates: [-115.44976660003145,32.66631261591882 ] },
        { name: 'Cervecería Colmena', coordinates: [-115.45125129478005,32.647987444448205 ] },
    ],
};

export default function MapMexicali() {
  const { style } = useParams();
  const [map, setMap] = useState(null);
  const [currentStyle, setCurrentStyle] = useState(style || 'ipa');
  const breweries = allBreweries[currentStyle] || [];

  const changeStyle = useCallback((style) => {
    setCurrentStyle(style);
  }, []);

  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    const markers = document.getElementsByClassName('maplibregl-marker');
    while(markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }

    // Add new markers
    const bounds = new maplibregl.LngLatBounds();  // To calculate bounds
    breweries.forEach(brewery => {
      const marker = new maplibregl.Marker({ color: '#FF8C00' })
        .setLngLat(brewery.coordinates)
        .setPopup(new maplibregl.Popup().setHTML(`<h3>${brewery.name}</h3>`))
        .addTo(map);

      bounds.extend(brewery.coordinates);  // Add coordinates to bounds
    });

    // Adjust map to fit all markers
    if (breweries.length > 0) {
      map.fitBounds(bounds, { padding: 50 });  // Adjust padding as necessary
    }

  }, [map, breweries]);

  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
      center: [-115.46, 32.65],
      zoom: 13,
    });
    setMap(map);
    return () => map.remove();
  }, []);

  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <AnimatedBackground />
      </div>
      <div className="w-full max-w-4xl mx-auto my-8 bg-white/80 backdrop-blur-sm shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Ruta de Cervecerías {currentStyle.toUpperCase()} en Mexicali</h1>
          <p className="text-gray-600 mb-4">Descubre las mejores cervezas {currentStyle.toUpperCase()} de la ciudad</p>
          <div className="mb-4">
            {Object.keys(allBreweries).map((style) => (
              <button 
                key={style}
                onClick={() => setCurrentStyle(style)} 
                className={`mr-2 px-4 py-2 rounded ${currentStyle === style ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {style.charAt(0).toUpperCase() + style.slice(1)}
              </button>
            ))}
          </div>
          <div id="map" className="w-full h-[70vh] rounded-md overflow-hidden" />
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Cervecerías</h3>
            {breweries.map((brewery, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {brewery.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}