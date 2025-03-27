
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-theme-dark/90 backdrop-blur-md border-b border-white/5' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Globe className="h-6 w-6 text-theme-blue mr-2" />
          <span className="font-medium text-xl tracking-tight">Instant<span className="text-theme-blue">Globe</span></span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            Our Rates
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            Locations
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200">
            About Us
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button className="bg-theme-blue hover:bg-theme-blue/90 text-white rounded-full px-6 py-2 transition-all duration-300 transform hover:scale-105">
            Join Waitlist
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-300 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-theme-dark/95 backdrop-blur-md absolute top-full left-0 w-full border-b border-white/5 animate-fade-in">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              How It Works
            </a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              Our Rates
            </a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              Locations
            </a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              About Us
            </a>
            <Button className="w-full bg-theme-blue hover:bg-theme-blue/90 text-white rounded-full py-2">
              Join Waitlist
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
