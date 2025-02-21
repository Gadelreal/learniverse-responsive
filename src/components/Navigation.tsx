
import { useState } from "react";
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
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed w-full backdrop-blur-sm z-50 border-b border-gray-100 bg-slate-200 hover:bg-slate-100 mx-[24px] my-[24px] rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
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
                className="w-auto"
              />
            </a>
            <div className="h-6 w-px bg-gray-300"></div>
            <a href="/" className="font-playfair text-xl font-bold text-secondary-foreground">
              Brand Strategy
            </a>
          </div>
          
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
  );
};

export default Navigation;
