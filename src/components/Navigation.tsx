
import { useState, useEffect } from "react";
import { Menu, X, Globe2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NavLink = ({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) => <a href={href} className="text-secondary-foreground hover:text-primary transition-colors duration-200 font-inter">
    {children}
  </a>;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isSpanish = location.pathname.includes('/es');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    if (isSpanish) {
      navigate('/');
    } else {
      navigate('/es');
    }
  };

  return <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'}`}>
      <div className="max-w-full px-6 md:px-12 mx-auto py-[24px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <a href="https://www.ie.edu" target="_blank" rel="noopener noreferrer" className="flex items-center">
              <img src="/lovable-uploads/a65b86fa-abf3-42aa-893d-b0b6c25b9f0e.png" alt="IE University" className={`transition-transform duration-300 ${isScrolled ? 'scale-75' : 'scale-100'}`} />
            </a>
            <div className="h-6 w-px bg-gray-300"></div>
            <a href={isSpanish ? "/es" : "/"} className={`font-playfair font-bold text-secondary-foreground transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              {isSpanish ? "Estrategia de Marca" : "Brand Strategy"}
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className={`flex space-x-8 transition-opacity duration-300 ${isScrolled ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}>
              <NavLink href="#context">{isSpanish ? "Contexto" : "Context"}</NavLink>
              <NavLink href="#vision">{isSpanish ? "Visión" : "Vision"}</NavLink>
              <NavLink href="#values">{isSpanish ? "Valores" : "Values"}</NavLink>
              <NavLink href="#coherence">{isSpanish ? "Coherencia" : "Coherence"}</NavLink>
            </div>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label={isSpanish ? "Switch to English" : "Cambiar a Español"}
            >
              <Globe2 className="h-4 w-4 text-secondary-foreground" />
              <span className="text-sm font-medium">{isSpanish ? "EN" : "ES"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              aria-label={isSpanish ? "Switch to English" : "Cambiar a Español"}
            >
              <Globe2 className="h-4 w-4 text-secondary-foreground" />
              <span className="text-sm font-medium">{isSpanish ? "EN" : "ES"}</span>
            </button>
            <button 
              className={`transition-all duration-300 ${isScrolled ? 'opacity-100' : 'opacity-100 lg:opacity-0'}`} 
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
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 animate-fade-in bg-white/95 backdrop-blur-sm rounded-lg">
            <div className="flex flex-col space-y-4">
              <NavLink href="#context">{isSpanish ? "Contexto" : "Context"}</NavLink>
              <NavLink href="#vision">{isSpanish ? "Visión" : "Vision"}</NavLink>
              <NavLink href="#values">{isSpanish ? "Valores" : "Values"}</NavLink>
              <NavLink href="#coherence">{isSpanish ? "Coherencia" : "Coherence"}</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>;
};

export default Navigation;
