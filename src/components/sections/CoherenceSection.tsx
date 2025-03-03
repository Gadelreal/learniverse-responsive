import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const BrandStrategyCards = [{
  title: "Clear Brand Identity",
  description: "Establish a clear and distinct brand identity that reflects the organization's values, personality, and positioning in the market."
}, {
  title: "Integrated Messaging",
  description: "Ensure consistency in messaging across all channels and platforms."
}, {
  title: "Brand Guidelines Consistency",
  description: "Develop comprehensive brand guidelines."
}, {
  title: "Customer Experience",
  description: "Deliver a consistent and cohesive brand experience."
}, {
  title: "Employee Alignment",
  description: "Ensure employees understand and embody brand values."
}, {
  title: "Adaptability and Flexibility",
  description: "Allow for adaptability while maintaining consistency."
}, {
  title: "Feedback and Evaluation",
  description: "Regular evaluation helps maintain coherence."
}, {
  title: "Brand Governance",
  description: "Establish mechanisms for brand governance and oversight."
}];
const CoherenceSection = () => {
  return <section id="coherence" className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 opacity-0 translate-y-10 scroll-animate px-[240px]">
          Coherence & Consistency: From a Strategic Decision to the Final Implementation
        </h2>
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="font-inter text-gray-600 leading-relaxed opacity-0 translate-y-10 scroll-animate">
              Coherence and consistency are essential principles in brand strategy as they ensure alignment and effectiveness in communicating a brand's identity, values, and promises to its target audience.
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
export default CoherenceSection;