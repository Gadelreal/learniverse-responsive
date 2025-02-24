
import React from 'react';
import VideoPlayer from '../VideoPlayer';

const ContextSection = () => {
  return (
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
  );
};

export default ContextSection;
