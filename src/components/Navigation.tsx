
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-secondary-foreground hover:text-primary transition-colors duration-200 font-inter"
  >
    {children}
  </a>
);

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-full px-6 md:px-12 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.ie.edu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center"
            >
              <img 
                src="/lovable-uploads/a65b86fa-abf3-42aa-893d-b0b6c25b9f0e.png" 
                alt="IE University" 
                className={`transition-transform duration-300 ${
                  isScrolled ? 'scale-75' : 'scale-100'
                }`}
              />
            </a>
            <div className="h-6 w-px bg-gray-300"></div>
            <a 
              href="/" 
              className={`font-playfair font-bold text-secondary-foreground transition-all duration-300 ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}
            >
              Brand Strategy
            </a>
          </div>
          
          {/* Desktop Navigation - Hide on mobile and when scrolled */}
          <div className={`hidden lg:flex space-x-8 transition-opacity duration-300 ${
            isScrolled ? 'opacity-0 lg:opacity-100' : 'opacity-100'
          }`}>
            <NavLink href="#context">Context</NavLink>
            <NavLink href="#vision">Vision</NavLink>
            <NavLink href="#values">Values</NavLink>
            <NavLink href="#coherence">Coherence</NavLink>
          </div>

          {/* Hamburger Menu Button - Show on mobile or when scrolled */}
          <button 
            className={`lg:hidden transition-all duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-100 lg:opacity-0'
            }`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-secondary-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-secondary-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 animate-fade-in bg-white/95 backdrop-blur-sm rounded-lg">
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
  );
};

export default Navigation;
