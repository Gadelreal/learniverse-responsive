
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import ExerciseForm from "../components/ExerciseForm";
import { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const BrandStrategyCards = [
  {
    title: "Clear Brand Identity",
    description: "Establish a clear and distinct brand identity that reflects the organization's values, personality, and positioning in the market."
  },
  {
    title: "Integrated Messaging",
    description: "Ensure consistency in messaging across all channels and platforms."
  },
  {
    title: "Brand Guidelines Consistency",
    description: "Develop comprehensive brand guidelines."
  },
  {
    title: "Customer Experience",
    description: "Deliver a consistent and cohesive brand experience."
  },
  {
    title: "Employee Alignment",
    description: "Ensure employees understand and embody brand values."
  },
  {
    title: "Adaptability and Flexibility",
    description: "Allow for adaptability while maintaining consistency."
  },
  {
    title: "Feedback and Evaluation",
    description: "Regular evaluation helps maintain coherence."
  },
  {
    title: "Brand Governance",
    description: "Establish mechanisms for brand governance and oversight."
  }
];

const Index = () => {
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/lovable-uploads/cc6e1f8b-fd0d-41c3-9bf5-1ab95736be0a.png" alt="A minimalist white background with diagonal lines" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 animate-fade-up">
            Brand Strategy
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-up">
            When communicating any brand's values, it is crucial to consider the context around it. This context gives insights into the opportunities and challenges surrounding the brand, guiding strategic decision-making, and ensuring alignment with industry trends and consumer expectations.
          </p>
          <a href="#context" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-md font-inter text-lg hover:bg-primary/90 transition-colors animate-fade-up">
            Explore More
          </a>
        </div>
      </section>

      {/* Context Section */}
      <section id="context" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
            Context
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
              Watch the following video where the professor explains the key components you need to consider in the context of a brand.
            </p>
            <VideoPlayer title="Brand Audit: What Is Happening Around?" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" />
            <div className="bg-gray-50 p-8 rounded-lg mt-12 opacity-0 translate-y-10 scroll-animate shadow-sm">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-gray-900">Brand Strategy</h3>
              <p className="font-inter text-gray-600">
                Once we have finished the brand audit and we understand the context where the brand is framed, it's time to create the brand strategy. At this point, a key aspect is to consider whether we are creating a brand from scratch or repositioning an existing one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="relative min-h-screen flex items-center py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/f88c5c97-3e5b-40fd-bba2-eb75215e05d5.png" 
            alt="A minimalistic white background with a coffee cup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
            Vision & Purpose
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-gray-600 leading-relaxed mb-12 opacity-0 translate-y-10 scroll-animate">
              The vision is a statement that articulates the long-term aspirations and future direction of an organization. It represents the desired future state or outcome that the organization aims to achieve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-gray-900">Key Features of Vision</h3>
                <ul className="space-y-4 font-inter text-gray-600">
                  <li>• Inspiration and motivation</li>
                  <li>• Clarity and conciseness</li>
                  <li>• Long-term orientation</li>
                  <li>• Ambition and relevance</li>
                  <li>• Adaptability to change</li>
                </ul>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg opacity-0 translate-y-10 scroll-animate shadow-sm">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-gray-900">Purpose Characteristics</h3>
                <ul className="space-y-4 font-inter text-gray-600">
                  <li>• Alignment with Vision</li>
                  <li>• Impact on positive change</li>
                  <li>• Stakeholder Focus</li>
                  <li>• Inspiration and motivation</li>
                  <li>• Long-term orientation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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

      {/* Coherence Section */}
      <section id="coherence" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 opacity-0 translate-y-10 scroll-animate">
            Coherence & Consistency: From a Strategic Decision to the Final Implementation
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              <p className="font-inter text-gray-600 leading-relaxed opacity-0 translate-y-10 scroll-animate">
                Coherence and consistency are essential principles in brand strategy as they ensure alignment and effectiveness in communicating a brand's identity, values, and promises to its target audience.
              </p>
              
              <div className="mt-12 opacity-0 translate-y-10 scroll-animate">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {BrandStrategyCards.map((card, index) => (
                      <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
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
                      </CarouselItem>
                    ))}
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
      </section>

      {/* Exercise Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
            Practice Exercise
          </h2>
          <ExerciseForm />
        </div>
      </section>

      <Footer />
    </div>;
};

export default Index;
