
import React from 'react';

const ValuesSectionES = () => {
  return (
    <section id="values" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          Valores
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
            Los valores de una empresa son los cimientos de su propósito y representan su compromiso. Definir los valores de una organización implica un proceso reflexivo e inclusivo que involucra a diferentes grupos de interés.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Valores Básicos</h3>
              <p className="font-inter text-gray-600">
                Valores que todas las marcas de una determinada categoría necesitarían para ser competitivas en el mercado.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Valores Valorados</h3>
              <p className="font-inter text-gray-600">
                Valores que son más apreciados por los grupos de interés, que pueden ser propios o compartidos con otros competidores.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Valores Diferenciales</h3>
              <p className="font-inter text-gray-600">
                Valores que realmente identifican y hacen relevante a una marca en comparación con otras. Deben contribuir a lograr una reputación deseada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSectionES;
