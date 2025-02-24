
import React from 'react';

const VisionSection = () => {
  return (
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
  );
};

export default VisionSection;
