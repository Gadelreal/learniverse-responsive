
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
              EduContent
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="#courses">Courses</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#categories">Categories</NavLink>
              <NavLink href="#contact">Contact</NavLink>
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
                <NavLink href="#courses">Courses</NavLink>
                <NavLink href="#about">About</NavLink>
                <NavLink href="#categories">Categories</NavLink>
                <NavLink href="#contact">Contact</NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6">
            Elevate Your Learning Journey
          </h1>
          <p className="font-inter text-lg md:text-xl text-muted-foreground mb-8">
            Discover curated educational content designed to inspire and empower your growth.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white font-inter font-medium px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105">
            Explore Courses
          </button>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={`https://images.unsplash.com/photo-148859028505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80`}
                  alt="Course thumbnail"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-primary text-sm font-inter font-medium">BEGINNER</span>
                  <h3 className="font-playfair text-xl font-bold mt-2 mb-3">Introduction to Digital Learning</h3>
                  <p className="text-muted-foreground font-inter">
                    Master the fundamentals of digital education and online learning strategies.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 animate-fade-up">
              Our Mission
            </h2>
            <p className="font-inter text-muted-foreground leading-relaxed mb-8 animate-fade-up">
              We believe in the power of education to transform lives. Our platform provides
              carefully curated content that empowers learners to achieve their goals and unlock
              their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-up">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Technology", "Business", "Design", "Science"].map((category, i) => (
              <div
                key={category}
                className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-200 animate-fade-up cursor-pointer"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="font-playfair font-bold text-lg mb-2">{category}</h3>
                <p className="font-inter text-sm text-muted-foreground">
                  Explore {category.toLowerCase()} courses
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-playfair font-bold text-lg mb-4">EduContent</h3>
              <p className="font-inter text-sm text-muted-foreground">
                Empowering learners worldwide with quality educational content.
              </p>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Quick Links</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Support</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-bold mb-4">Connect</h4>
              <ul className="font-inter text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="font-inter text-sm text-muted-foreground">
              © 2024 EduContent. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
