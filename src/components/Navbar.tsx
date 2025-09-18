
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  const launchApp = () => {
    window.open('https://rootspay.vercel.app/', '_self')
  }

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-theme-dark/80 backdrop-blur-md border-b border-white/5 shadow-lg' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-theme-blue to-theme-cyan flex items-center justify-center mr-2">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="font-space font-medium text-xl tracking-tight">Instant<span className="gradient-text font-semibold">Globe</span></span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/converter" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-theme-blue after:to-theme-cyan after:transition-all">
            Currency Converter
          </Link>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-theme-blue after:to-theme-cyan after:transition-all">
            How It Works
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-theme-blue after:to-theme-cyan after:transition-all">
            Our Rates
          </a>
          <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-gradient-to-r after:from-theme-blue after:to-theme-cyan after:transition-all">
            About Us
          </a>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            className="gradient-btn text-white rounded-xl px-6 py-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={launchApp}
          >
            Launch App
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
        <div className="md:hidden bg-theme-dark/95 glassmorphism absolute top-full left-0 w-full border-b border-white/5 animate-fade-in">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <Link to="/converter" className="block py-2 text-gray-300 hover:text-white">
              Currency Converter
            </Link>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              How It Works
            </a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              Our Rates
            </a>
            <a href="#" className="block py-2 text-gray-300 hover:text-white">
              About Us
            </a>
            <Button 
              className="w-full gradient-btn text-white rounded-xl py-2 shadow-lg"
              onClick={launchApp}
            >
              Launch App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
