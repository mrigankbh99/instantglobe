
import React, { useEffect } from 'react';
import NavbarWithTheme from '@/components/NavbarWithTheme';
import CurrencyConverterSection from '@/components/CurrencyConverterSection';
import Footer from '@/components/Footer';

const CurrencyConverter = () => {
  useEffect(() => {
    // Set page title
    document.title = "Currency Converter | InstantGlobe";
    
    // Apply saved theme on initial load
    const savedTheme = localStorage.getItem('instantglobe-theme') || 'default';
    const htmlElement = document.documentElement;
    
    // Only apply if it's not the default theme
    if (savedTheme !== 'default' && savedTheme) {
      htmlElement.classList.add(`theme-${savedTheme}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-theme-dark overflow-x-hidden">
      <NavbarWithTheme />
      <div className="pt-24 pb-16">
        <CurrencyConverterSection />
      </div>
      <Footer />
    </div>
  );
};

export default CurrencyConverter;
