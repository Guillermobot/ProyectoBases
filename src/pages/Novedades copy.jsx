import React, { useState, useEffect } from "react";
import { Beer, Calendar, MapPin } from "lucide-react";

const AnimatedBackground = () => (
  <div className=" w-screen fixed inset-0 z-[-1] bg-gradient-to-br from-green-50 to-white-200 animate-gradient-x"></div>
);

const NovedadCard = ({ title, imageUrl, description, icon, category, fecha, onClick }) => (
  <div
    className=" group relative w-full  overflow-hidden cursor-pointer rounded-lg shadow-lg"
    onClick={onClick}
  >
    {/* Imagen Principal */}
    <div className="relative w-full h-[300px] overflow-hidden">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => e.target.src = '/placeholder.svg?height=300&width=400'} 
      />
      
      {/* Overlay Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
    </div>

    {/* Contenido Superpuesto */}
    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
      {/* Texto Principal */}
      <div>
        <h3 className="text-2xl font-black text-white italic transform -skew-x-12 uppercase tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-sm text-white/80">{description}</p>
      </div>
      
      {/* Caja de Categoría */}
      <div className="w-screen bg-red-600 p-2 transform -skew-x-12">
        <span className="text-white font-bold text-sm uppercase block transform skew-x-12">
          {category}
        </span>
      </div>
    </div>

    {/* Icono y Fecha */}
    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1">
      {icon}
      <span className="text-xs font-medium text-amber-800">{fecha}</span>
    </div>
  </div>
);

const Novedades = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const novedades = [
    {
      title: "Averno",
      icon: <Beer className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/avernowall.png",
      description: "Descubre el sabor de nuestra última creación.",
      category: "Lugar",
      fecha: "Disponible ahora",
      onClick: () => console.log("Navegando a Nueva Stout Imperial")
    },
    {
      title: "El Sarmiento Tap Room",
      icon: <Calendar className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/Sarmientowall.png",
      description: "Únete a nosotros para celebrar en grande.",
      category: "Lugar",
      fecha: "15-17 Marzo",
      onClick: () => console.log("Navegando a Festival de Cerveza")
    },
    {
      title: "Wendlatndt Tasting Room",
      icon: <MapPin className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/wendlandtwall.png",
      description: "Nueva cervecería artesanal en la ruta.",
      category: "Lugar",
      fecha: "Recién abierto",
      onClick: () => console.log("Navegando a CheveNico")
    },
    {
      title: "Bastards Tavern",
      icon: <Beer className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/bastardswall.png",
      description: "Descubre el sabor de nuestra última creación.",
      category: "Lugar",
      fecha: "Disponible ahora",
      onClick: () => console.log("Navegando a Nueva Stout Imperial")
    },
    {
      title: "Urbana",
      icon: <Calendar className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/urbanawall.png",
      description: "Únete a nosotros para celebrar en grande.",
      category: "Lugar",
      fecha: "15-17 Marzo",
      onClick: () => console.log("Navegando a Festival de Cerveza")
    },
    {
      title: "Amante Brewing Company",
      icon: <MapPin className="h-5 w-5 text-amber-800" />,
      imageUrl: "/images/amantewall.png",
      description: "Nueva cervecería artesanal en la ruta.",
      category: "Lugar",
      fecha: "Recién abierto",
      onClick: () => console.log("Navegando a CheveNico")
    }
  ];

  return (
    <div className="w-screen w-full min-h-screen flex flex-col items-center justify-start relative">
      <AnimatedBackground />
      <header className={` w-screen w-full sticky top-0 z-10 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="w-screen max-w-7xl mx-auto px-4">
          <div className="w-screen flex justify-between items-center h-16">
            <span className="w-screen text-2xl font-bold text-amber-800">RutaBrew</span>
            <nav className="w-screen hidden md:flex items-center gap-4">
              {['Inicio', 'Explorar', 'Favoritos', 'Eventos'].map((item) => (
                <button key={item} className="w-screen text-amber-800 hover:text-amber-600 transition-colors">
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="w-screen flex-grow w-full px-4 py-12 max-w-7x1 mx-auto">
        <h1 className="w-screen text-4xl md:text-5xl font-black text-amber-800 mb-8 text-center italic transform -skew-x-12 uppercase">
          EXPLORA
        </h1>
        <p className="w-screen text-amber-600 text-center max-w-2xl mx-auto mb-12">
          Descubre nuestras últimas novedades en cervezas artesanales, eventos especiales y nuevos lugares en la ruta cervecera.
        </p>
        
        <div className="w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {novedades.map((novedad, index) => (
            <NovedadCard
              key={index}
              title={novedad.title}
              imageUrl={novedad.imageUrl}
              description={novedad.description}
              icon={novedad.icon}
              category={novedad.category}
              fecha={novedad.fecha}
              onClick={novedad.onClick}
            />
          ))}
        </div>
      </main>

      <footer className="w-screen bg-amber-800 text-amber-50 py-6 w-full mt-12">
        <div className="w-screen max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 RutaBrew. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Novedades;