import React, { useRef } from 'react';

export default function AvernoPage() {
  const comidaRef = useRef(null);
  const bebidaRef = useRef(null);
  const merchRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Lista de secciones con sus respectivas propiedades
  const sections = [
    {
      ref: comidaRef,
      title: 'American Extra Stout',
      description: '6% - Cerveza con oscura con toques a café',
      imgSrc: '/images/stoutsarmiento.jpg',
      alt: 'Comida'
    },
    {
      ref: bebidaRef,
      title: 'Hazy Ipa',
      description: '8% - Cerveza lupulosa con toques frescos ',
      imgSrc: '/images/hazyipasarmiento.jpg',
      alt: 'Bebida'
    },
    {
      ref: bebidaRef,
      title: 'American IPA',
      description: '8% - Cerveza fresca con toques ...',
      imgSrc: '/images/americanipa.jpg',
      alt: 'Bebida'
    },
    {
      ref: merchRef,
      title: 'Watermelon IPA',
      description: '7.9% - Refrescante cerveza lupulada con toques a sandía',
      imgSrc: '/images/watermelonipa.jpg',
      alt: 'Merch'
    },  {
      ref: bebidaRef,
      title: 'Slushie Sandia',
      description: 'El sarmiento realiza el destape de una nueva cerveza de temporada',
      imgSrc: '/images/slushie.jpg',
      alt: 'Bebida'
    },
    {
      ref: bebidaRef,
      title: 'Slushie Lemon',
      description: 'El sarmiento realiza el destape de una nueva cerveza de temporada',
      imgSrc: '/images/slushie.jpg',
      alt: 'Bebida'
    },
    {
      ref: merchRef,
      title: '¡NUEVA MERCANCÍA!',
      description: 'Descubre nuestra nueva colección de productos',
      imgSrc: '/images/stoutsarmiento.jpg',
      alt: 'Merch'
    }
  ];

  return (
    <div 
      className="min-h-screen w-full bg-zinc-900 bg-cover bg-center text-white font-sans"
      style={{
        backgroundImage: ""
      }}
    >
      {/* Header Image and Logo */}
      <div className="relative h-[300px] w-full">
        <img
          src="/images/avernocc.jpg"
          alt="El Sarmiento Tap Room"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 p-2 bg-transparent sticky top-0 z-10 max-w-4xl mx-auto">
        {['Comida', 'Bebida', 'Merch'].map((item, index) => (
          <button
            key={item}
            onClick={() => scrollToSection([comidaRef, bebidaRef, merchRef][index])}
            className="flex-1 py-3 px-4 bg-[#A67C52] text-white border-none rounded-lg cursor-pointer text-xl font-bold hover:bg-[#8B6642] transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Renderizado de cada sección dinámicamente */}
        {sections.map((section, index) => (
          <div ref={section.ref} key={index} className="bg-black/60 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="flex items-center">
              <img
                src={section.imgSrc}
                alt={section.alt}
                className="w-40 h-40 object-cover"
              />
              <div className="p-6 flex-1">
                <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                <p className="text-gray-200 text-lg">
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
