
import React from 'react';
import CurrencyConverter from './CurrencyConverter';

const RatesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="rates">
      <div className="absolute inset-0 bg-gradient-to-b from-theme-dark/0 via-theme-purple/5 to-theme-dark/0 pointer-events-none"></div>
      
      {/* Floating Elements for Visual Interest */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-theme-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-theme-green/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Currency Exchange Rates</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get competitive exchange rates with InstantGlobe. Send money to India quickly and securely.
          </p>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatesSection;
