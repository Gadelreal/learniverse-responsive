
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair font-bold text-lg mb-4">Brand Strategy</h3>
            <p className="font-inter text-sm text-gray-600">
              Understanding and implementing effective brand strategies.
            </p>
          </div>
          <div>
            <h4 className="font-playfair font-bold mb-4">Quick Links</h4>
            <ul className="font-inter text-sm space-y-2">
              <li><a href="#context" className="text-gray-600 hover:text-primary transition-colors">Context</a></li>
              <li><a href="#vision" className="text-gray-600 hover:text-primary transition-colors">Vision</a></li>
              <li><a href="#values" className="text-gray-600 hover:text-primary transition-colors">Values</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-bold mb-4">Support</h4>
            <ul className="font-inter text-sm space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-playfair font-bold mb-4">Connect</h4>
            <ul className="font-inter text-sm space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="font-inter text-sm text-gray-600">
            © 2024 Brand Strategy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
