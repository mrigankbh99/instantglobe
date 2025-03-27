
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/use-mobile';
import ThemeSelector from './ThemeSelector';

const NavbarWithTheme = () => {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/converter', label: 'Send Money' },
    { href: '#waitlist-section', label: 'Join Waitlist' },
  ];

  const NavLinks = () => (
    <div className="flex gap-8 items-center">
      {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.href}
          className="text-white/80 hover:text-white transition-all duration-200 font-medium"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
        scrolled ? 'glassmorphism' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 bg-white rounded-full flex items-center justify-center">
            <div className="h-6 w-6 bg-gradient-to-r from-theme-blue to-theme-cyan rounded-full" />
          </div>
          <span className="font-bold text-xl text-white">InstantGlobe</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isMobile && <NavLinks />}
          
          <div className="flex items-center gap-2">
            <ThemeSelector />
            
            {!isMobile && (
              <Button asChild className="bg-white text-theme-dark hover:bg-white/90">
                <Link to="/converter">Send Money</Link>
              </Button>
            )}
            
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-white/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-6 mt-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="text-foreground hover:text-primary transition-all duration-200 font-medium text-lg"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarWithTheme;
