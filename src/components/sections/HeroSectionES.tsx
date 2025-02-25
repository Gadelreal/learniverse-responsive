
import React from 'react';

const HeroSectionES = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden" role="banner">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/cc6e1f8b-fd0d-41c3-9bf5-1ab95736be0a.png" 
          alt="Un fondo minimalista blanco con líneas diagonales" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 animate-fade-up">
          Estrategia de Marca
        </h1>
        <p className="font-inter text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-up">
          Al comunicar los valores de cualquier marca, es crucial considerar el contexto que la rodea. Este contexto proporciona información sobre las oportunidades y desafíos que rodean a la marca, guiando la toma de decisiones estratégicas y asegurando la alineación con las tendencias de la industria y las expectativas del consumidor.
        </p>
        <a 
          href="#context" 
          className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-md font-inter text-lg hover:bg-primary/90 transition-colors animate-fade-up"
          aria-label="Explorar más sobre estrategia de marca"
        >
          Explorar Más
        </a>
      </div>
    </section>
  );
};

export default HeroSectionES;
