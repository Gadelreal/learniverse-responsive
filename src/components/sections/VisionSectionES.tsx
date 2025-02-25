
import React from 'react';

const VisionSectionES = () => {
  return (
    <section id="vision" className="relative min-h-screen flex items-center py-32">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/f88c5c97-3e5b-40fd-bba2-eb75215e05d5.png" 
          alt="Un fondo minimalista blanco con una taza de café" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          Visión y Propósito
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
            La visión es una declaración que articula las aspiraciones a largo plazo y la dirección futura de una organización. Representa el estado o resultado futuro deseado que la organización aspira a alcanzar.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-2xl font-bold mb-6 text-gray-900">Características Clave de la Visión</h3>
              <ul className="space-y-4 font-inter text-gray-600">
                <li>• Inspiración y motivación</li>
                <li>• Claridad y concisión</li>
                <li>• Orientación a largo plazo</li>
                <li>• Ambición y relevancia</li>
                <li>• Adaptabilidad al cambio</li>
              </ul>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-2xl font-bold mb-6 text-gray-900">Características del Propósito</h3>
              <ul className="space-y-4 font-inter text-gray-600">
                <li>• Alineación con la Visión</li>
                <li>• Impacto en el cambio positivo</li>
                <li>• Enfoque en los stakeholders</li>
                <li>• Inspiración y motivación</li>
                <li>• Orientación a largo plazo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSectionES;
