
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-secondary-foreground hover:text-primary transition-colors duration-200 font-inter"
  >
    {children}
  </a>
);

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="font-playfair text-xl font-bold text-secondary-foreground">
              Brand Strategy
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="#context">Context</NavLink>
              <NavLink href="#vision">Vision</NavLink>
              <NavLink href="#values">Values</NavLink>
              <NavLink href="#coherence">Coherence</NavLink>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-secondary-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-secondary-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <NavLink href="#context">Context</NavLink>
                <NavLink href="#vision">Vision</NavLink>
                <NavLink href="#values">Values</NavLink>
                <NavLink href="#coherence">Coherence</NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Understanding Brand Strategy
          </h1>
          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8">
            Learn about the key components of successful brand strategy: Context, Vision, Purpose, Values, and Coherence.
          </p>
        </div>
      </section>

      {/* Context Section */}
      <section id="context" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Brand Context
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="font-inter text-muted-foreground leading-relaxed mb-8 animate-fade-up">
              When communicating any brand's values, it is crucial to consider the context around it. This context gives insights into the opportunities and challenges surrounding the brand, guiding strategic decision-making, and ensuring alignment with industry trends and consumer expectations.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
              <h3 className="font-playfair text-xl font-bold mb-4">Brand Audit</h3>
              <p className="font-inter text-muted-foreground">
                Once we have finished the brand audit and we understand the context where the brand is framed, it's time to create the brand strategy. At this point, a key aspect is to consider whether we are creating a brand from scratch or repositioning an existing one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Vision & Purpose
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="animate-fade-up">
              <h3 className="font-playfair text-2xl font-bold mb-4">Vision</h3>
              <ul className="space-y-4 font-inter text-muted-foreground">
                <li>• Inspiration and motivation for stakeholders</li>
                <li>• Clarity in communication</li>
                <li>• Long-term orientation</li>
                <li>• Ambition and relevance</li>
                <li>• Adaptability to change</li>
              </ul>
            </div>
            <div className="animate-fade-up">
              <h3 className="font-playfair text-2xl font-bold mb-4">Purpose</h3>
              <ul className="space-y-4 font-inter text-muted-foreground">
                <li>• Alignment with company vision</li>
                <li>• Positive impact focus</li>
                <li>• Stakeholder consideration</li>
                <li>• Inspiration and motivation</li>
                <li>• Long-term orientation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Brand Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
              <h3 className="font-playfair text-xl font-bold mb-4">Basic Values</h3>
              <p className="font-inter text-muted-foreground">
                Values that all the brands of a certain category would need to be competitive in the market.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
              <h3 className="font-playfair text-xl font-bold mb-4">Valued Values</h3>
              <p className="font-inter text-muted-foreground">
                Values that are most appreciated by stakeholders, which can be our own or shared with other competitors.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-up">
              <h3 className="font-playfair text-xl font-bold mb-4">Differential Values</h3>
              <p className="font-inter text-muted-foreground">
                Values that really identify and make a brand relevant compared to others. They should contribute to achieving a desired reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coherence Section */}
      <section id="coherence" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Coherence & Consistency
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <p className="font-inter text-muted-foreground leading-relaxed animate-fade-up">
                Coherence and consistency are essential principles in brand strategy as they ensure alignment and effectiveness in communicating a brand's identity, values, and promises to its target audience.
              </p>
              <ul className="space-y-4 font-inter text-muted-foreground animate-fade-up">
                <li>• Clear Brand Identity</li>
                <li>• Integrated Messaging</li>
                <li>• Brand Guidelines Consistency</li>
                <li>• Customer Experience</li>
                <li>• Employee Alignment</li>
                <li>• Adaptability and Flexibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-playfair font-bold text-lg mb-4">Brand Strategy</h3>
              <p className="font-inter text-sm text-muted-foreground">
                Understanding and implementing effective brand strategies.
              </p>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Quick Links</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#context" className="text-muted-foreground hover:text-primary transition-colors">Context</a></li>
                <li><a href="#vision" className="text-muted-foreground hover:text-primary transition-colors">Vision</a></li>
                <li><a href="#values" className="text-muted-foreground hover:text-primary transition-colors">Values</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Support</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Resources</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Connect</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="font-inter text-sm text-muted-foreground">
              © 2024 Brand Strategy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
