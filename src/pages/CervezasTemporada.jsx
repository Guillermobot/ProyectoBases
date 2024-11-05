import React, { useState, useEffect } from "react";
import { Beer, Calendar, MapPin, Menu, X } from "lucide-react";

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-green-50 to-amber-100 animate-gradient-x"></div>
);

const CervezaCard = ({ nombre, imageUrl, description, icon, estilo, fecha, onClick }) => (
  <div
    className="w-screen group relative w-full overflow-hidden cursor-pointer rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
    onClick={onClick}
  >
    <div className="relative w-full h-[300px] overflow-hidden">
      <img 
        src={imageUrl} 
        alt={nombre}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => e.target.src = '/placeholder.svg?height=300&width=400'} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
      <div>
        <h3 className="text-2xl font-black text-white italic transform -skew-x-12 uppercase tracking-tight mb-2">
          {nombre}
        </h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
      <div className="bg-red-600 p-2 transform -skew-x-12">
        <span className="text-white font-bold text-sm uppercase block transform skew-x-12">
          {estilo}
        </span>
      </div>
    </div>
    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
      {icon}
      <span className="text-xs font-medium text-amber-800">{fecha}</span>
    </div>
  </div>
);

const CervezasTemporales = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cervezas = [
    {
      nombre: "Oktoberfest Märzen",
      icon: <Beer className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/urbanawall.png",
      description: "Cerveza tradicional de otoño, maltosa y suave.",
      estilo: "Märzen",
      fecha: "Septiembre - Octubre",
      onClick: () => console.log("Navegando a Oktoberfest Märzen")
    },
    {
      nombre: "Pumpkin Ale",
      icon: <Calendar className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/pumpkin-ale.jpg",
      description: "Ale especiada con sabores de calabaza y canela.",
      estilo: "Spiced Ale",
      fecha: "Octubre - Noviembre",
      onClick: () => console.log("Navegando a Pumpkin Ale")
    },
    {
      nombre: "Winter Warmer",
      icon: <MapPin className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/winter-warmer.jpg",
      description: "Cerveza fuerte y maltosa perfecta para el invierno.",
      estilo: "Strong Ale",
      fecha: "Diciembre - Febrero",
      onClick: () => console.log("Navegando a Winter Warmer")
    },
    {
      nombre: "Spring Blossom IPA",
      icon: <Beer className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/spring-ipa.jpg",
      description: "IPA floral con notas cítricas de primavera.",
      estilo: "IPA",
      fecha: "Marzo - Mayo",
      onClick: () => console.log("Navegando a Spring Blossom IPA")
    },
    {
      nombre: "Summer Wheat",
      icon: <Calendar className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/summer-wheat.jpg",
      description: "Cerveza de trigo refrescante para el verano.",
      estilo: "Hefeweizen",
      fecha: "Junio - Agosto",
      onClick: () => console.log("Navegando a Summer Wheat")
    },
    {
      nombre: "Harvest Ale",
      icon: <MapPin className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/harvest-ale.jpg",
      description: "Ale con lúpulos frescos de la cosecha de otoño.",
      estilo: "Fresh Hop Ale",
      fecha: "Agosto - Septiembre",
      onClick: () => console.log("Navegando a Harvest Ale")
    }
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start relative">
      <AnimatedBackground />
      <header className={`w-full sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <span className="text-2xl font-bold text-amber-800">RutaBrew</span>
            <nav className="hidden md:flex items-center gap-4">
              {['Inicio', 'Cervezas', 'Temporadas', 'Eventos'].map((item) => (
                <button key={item} className="text-amber-800 hover:text-amber-600 transition-colors">
                  {item}
                </button>
              ))}
            </nav>
            <button 
              className="md:hidden text-amber-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-6">
            {['Inicio', 'Cervezas', 'Temporadas', 'Eventos'].map((item) => (
              <button 
                key={item} 
                className="text-2xl font-bold text-amber-800 hover:text-amber-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}

      <main className="flex-grow w-full px-4 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-amber-800 mb-8 text-center italic transform -skew-x-12 uppercase">
          Cervezas Temporales
        </h1>
        <p className="text-amber-600 text-center max-w-2xl mx-auto mb-12">
          Descubre nuestras cervezas de temporada, creadas especialmente para disfrutar en cada época del año.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cervezas.map((cerveza, index) => (
            <CervezaCard
              key={index}
              nombre={cerveza.nombre}
              imageUrl={cerveza.imageUrl}
              description={cerveza.description}
              icon={cerveza.icon}
              estilo={cerveza.estilo}
              fecha={cerveza.fecha}
              onClick={cerveza.onClick}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors duration-300">
            Ver todas las cervezas
          </button>
        </div>
      </main>

      <footer className="bg-amber-800 text-amber-50 py-6 w-full mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default CervezasTemporales;