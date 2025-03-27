
import React from 'react';
import CurrencyConverter from './CurrencyConverter';

const RatesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden" id="rates">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Rates</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get competitive exchange rates with InstantGlobe. Send money to India quickly and securely.
          </p>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatesSection;
