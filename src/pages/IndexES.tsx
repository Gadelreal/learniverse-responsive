
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
      <main id="main-content" tabIndex={-1}>
        <HeroSectionES />
        <ContextSectionES />
        <VisionSectionES />
        <ValuesSectionES />
        <CoherenceSectionES />

        {/* Exercise Section */}
        <section className="py-32 bg-white" aria-labelledby="practice-exercise-heading-es">
          <div className="container mx-auto px-4">
            <h2 id="practice-exercise-heading-es" className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900 opacity-0 translate-y-10 scroll-animate">
              Ejercicio Práctico
            </h2>
            <ExerciseForm />
          </div>
        </section>

        {/* Channels Exercise Section */}
        <section className="py-32 bg-gray-50" aria-label="Ejercicio de Canales">
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
      </main>
      <Footer />
    </div>
  );
};

export default IndexES;
