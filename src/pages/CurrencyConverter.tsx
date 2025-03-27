
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CurrencyConverterSection from '@/components/CurrencyConverterSection';

const CurrencyConverter = () => {
  useEffect(() => {
    // Set page title
    document.title = "InstantGlobe | Live Currency Converter";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-theme-dark font-poppins">
      <Navbar />
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-2 tracking-tight">
          Live Currency Converter
        </h1>
        <p className="text-theme-gray text-center max-w-2xl mx-auto mb-12">
          Convert your currency to Indian Rupees (INR) with our real-time converter. 
          Get the most competitive rates with zero transaction fees.
        </p>
        <CurrencyConverterSection />
      </div>
      <Footer />
    </div>
  );
};

export default CurrencyConverter;
