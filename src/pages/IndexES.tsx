
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ExerciseForm from "../components/ExerciseForm";
import ChannelsExercise from "../components/ChannelsExercise";
import DownloadSection from "../components/DownloadSection";
import HeroSectionES from "../components/sections/HeroSectionES";
import ContextSectionES from "../components/sections/ContextSectionES";
import VisionSectionES from "../components/sections/VisionSectionES";
import ValuesSectionES from "../components/sections/ValuesSectionES";
import CoherenceSectionES from "../components/sections/CoherenceSectionES";
import ConclusionExercise from "../components/ConclusionExercise";
import useScrollAnimation from "../hooks/useScrollAnimation";

const IndexES = () => {
  // Use the extracted scroll animation hook
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSectionES />
      <ContextSectionES />
      <VisionSectionES />
      <ValuesSectionES />
      <CoherenceSectionES />

      {/* Exercise Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
            Ejercicio Práctico
          </h2>
          <ExerciseForm />
        </div>
      </section>

      {/* Channels Exercise Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="opacity-0 translate-y-10 scroll-animate">
            <ChannelsExercise />
          </div>
        </div>
      </section>
      
      {/* Conclusion Exercise Section */}
      <div className="opacity-0 translate-y-10 scroll-animate">
        <ConclusionExercise />
      </div>

      {/* Download Section */}
      <div className="opacity-0 translate-y-10 scroll-animate">
        <DownloadSection />
      </div>

      <Footer />
    </div>
  );
};

export default IndexES;
