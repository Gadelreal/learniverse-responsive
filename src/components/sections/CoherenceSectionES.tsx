import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const BrandStrategyCards = [{
  title: "Identidad de Marca Clara",
  description: "Establecer una identidad de marca clara y distintiva que refleje los valores, la personalidad y el posicionamiento de la organización en el mercado."
}, {
  title: "Mensajes Integrados",
  description: "Asegurar la consistencia en los mensajes a través de todos los canales y plataformas."
}, {
  title: "Consistencia en Guías de Marca",
  description: "Desarrollar guías de marca completas."
}, {
  title: "Experiencia del Cliente",
  description: "Ofrecer una experiencia de marca consistente y coherente."
}, {
  title: "Alineación de Empleados",
  description: "Asegurar que los empleados entiendan y encarnen los valores de la marca."
}, {
  title: "Adaptabilidad y Flexibilidad",
  description: "Permitir la adaptabilidad manteniendo la consistencia."
}, {
  title: "Retroalimentación y Evaluación",
  description: "La evaluación regular ayuda a mantener la coherencia."
}, {
  title: "Gobierno de Marca",
  description: "Establecer mecanismos de gobierno y supervisión de marca."
}];
const CoherenceSectionES = () => {
  return <section id="coherence" className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 opacity-0 translate-y-10 scroll-animate">Coherencia y Consistencia: De una Decisión 
Estratégica a la Implementación Final</h2>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="font-inter text-gray-600 leading-relaxed opacity-0 translate-y-10 scroll-animate">
              La coherencia y la consistencia son principios esenciales en la estrategia de marca, ya que aseguran la alineación y efectividad en la comunicación de la identidad, valores y promesas de una marca a su público objetivo.
            </p>
            
            <div className="mt-12 opacity-0 translate-y-10 scroll-animate">
              <Carousel opts={{
              align: "start",
              loop: true
            }} className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {BrandStrategyCards.map((card, index) => <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                      <div className="p-1 h-full">
                        <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[400px] flex flex-col">
                          <CardContent className="p-8 flex flex-col h-full">
                            <div className="mb-6 text-primary text-4xl font-bold font-playfair">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">
                              {card.title}
                            </h3>
                            <div className="w-12 h-1 bg-primary mb-6"></div>
                            <p className="font-inter text-gray-600 text-sm leading-relaxed flex-grow">
                              {card.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>)}
                </CarouselContent>
                <div className="hidden md:block">
                  <CarouselPrevious className="left-0 -translate-x-1/2" />
                  <CarouselNext className="right-0 translate-x-1/2" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CoherenceSectionES;