
import React from 'react';
import VideoPlayer from '../VideoPlayer';

const ContextSectionES = () => {
  return (
    <section id="context" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          Contexto
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
            Mira el siguiente video donde el profesor explica los componentes clave que debes considerar en el contexto de una marca.
          </p>
          <VideoPlayer title="Auditoría de Marca: ¿Qué Está Sucediendo Alrededor?" src="https://www.youtube.com/embed/1Y8_RPUc8n8" />
          <div className="bg-gray-50 p-8 rounded-lg mt-12 opacity-0 translate-y-10 scroll-animate shadow-sm">
            <h3 className="font-playfair text-2xl font-bold mb-4 text-gray-900">Estrategia de Marca</h3>
            <p className="font-inter text-gray-600">
              Una vez que hemos finalizado la auditoría de marca y entendemos el contexto en el que se enmarca la marca, es momento de crear la estrategia de marca. En este punto, un aspecto clave es considerar si estamos creando una marca desde cero o reposicionando una existente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSectionES;
