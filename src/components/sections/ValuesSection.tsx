
import React from 'react';

const ValuesSection = () => {
  return (
    <section id="values" className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
          Values
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
            A company's values are the foundations of its purpose and represent its commitment. Defining the values of an organization involves a thoughtful and inclusive process that engages different stakeholders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Basic Values</h3>
              <p className="font-inter text-gray-600">
                Values that all the brands of a certain category would need to be competitive in the market.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Valued Values</h3>
              <p className="font-inter text-gray-600">
                Values that are most appreciated by stakeholders, which can be our own or shared with other competitors.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Differential Values</h3>
              <p className="font-inter text-gray-600">
                Values that really identify and make a brand relevant compared to others. They should contribute to achieving a desired reputation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
