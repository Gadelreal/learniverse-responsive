
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import ExerciseForm from "../components/ExerciseForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg"
            alt="Background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-white"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 animate-fade-up">
            Brand Strategy
          </h1>
          <p className="font-inter text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-up">
            When communicating any brand's values, it is crucial to consider the context around it. This context gives insights into the opportunities and challenges surrounding the brand, guiding strategic decision-making, and ensuring alignment with industry trends and consumer expectations.
          </p>
          <a 
            href="#context" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-md font-inter text-lg hover:bg-primary/90 transition-colors animate-fade-up"
          >
            Explore More
          </a>
        </div>
      </section>

      {/* Context Section */}
      <section id="context" className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 animate-fade-up">
            Context
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-gray-600 leading-relaxed mb-12 animate-fade-up">
              Watch the following video where the professor explains the key components you need to consider in the context of a brand.
            </p>
            <VideoPlayer 
              title="Brand Audit: What Is Happening Around?"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            />
            <div className="bg-gray-50 p-8 rounded-lg mt-12 animate-fade-up shadow-sm">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-gray-900">Brand Strategy</h3>
              <p className="font-inter text-gray-600">
                Once we have finished the brand audit and we understand the context where the brand is framed, it's time to create the brand strategy. At this point, a key aspect is to consider whether we are creating a brand from scratch or repositioning an existing one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 animate-fade-up">
            Vision & Purpose
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-gray-600 leading-relaxed mb-12">
              The vision is a statement that articulates the long-term aspirations and future direction of an organization. It represents the desired future state or outcome that the organization aims to achieve.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg animate-fade-up shadow-sm">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-gray-900">Key Features of Vision</h3>
                <ul className="space-y-4 font-inter text-gray-600">
                  <li>• Inspiration and motivation</li>
                  <li>• Clarity and conciseness</li>
                  <li>• Long-term orientation</li>
                  <li>• Ambition and relevance</li>
                  <li>• Adaptability to change</li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg animate-fade-up shadow-sm">
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
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 animate-fade-up">
            Values
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-gray-600 leading-relaxed mb-12">
              A company's values are the foundations of its purpose and represent its commitment. Defining the values of an organization involves a thoughtful and inclusive process that engages different stakeholders.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg animate-fade-up shadow-sm">
                <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Basic Values</h3>
                <p className="font-inter text-gray-600">
                  Values that all the brands of a certain category would need to be competitive in the market.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg animate-fade-up shadow-sm">
                <h3 className="font-playfair text-xl font-bold mb-4 text-gray-900">Valued Values</h3>
                <p className="font-inter text-gray-600">
                  Values that are most appreciated by stakeholders, which can be our own or shared with other competitors.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg animate-fade-up shadow-sm">
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
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 animate-fade-up">
            Coherence & Consistency: From a Strategic Decision to the Final Implementation
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <p className="font-inter text-gray-600 leading-relaxed animate-fade-up">
                Coherence and consistency are essential principles in brand strategy as they ensure alignment and effectiveness in communicating a brand's identity, values, and promises to its target audience.
              </p>
              <ul className="space-y-4 font-inter text-gray-600 animate-fade-up">
                <li>• Clear Brand Identity: Establish a clear and distinct brand identity that reflects the organization's values, personality, and positioning in the market.</li>
                <li>• Integrated Messaging: Ensure consistency in messaging across all channels and platforms.</li>
                <li>• Brand Guidelines Consistency: Develop comprehensive brand guidelines.</li>
                <li>• Customer Experience: Deliver a consistent and cohesive brand experience.</li>
                <li>• Employee Alignment: Ensure employees understand and embody brand values.</li>
                <li>• Adaptability and Flexibility: Allow for adaptability while maintaining consistency.</li>
                <li>• Feedback and Evaluation: Regular evaluation helps maintain coherence.</li>
                <li>• Brand Governance: Establish mechanisms for brand governance and oversight.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 animate-fade-up">
            Practice Exercise
          </h2>
          <ExerciseForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
