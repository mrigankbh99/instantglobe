
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
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="bg-theme-dark/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-medium mb-6">Why Choose Our Rates?</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-theme-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-theme-blue text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Competitive Exchange Rates</h4>
                    <p className="text-sm text-gray-400">Get more rupees for your dollars with our excellent rates.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-theme-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-theme-blue text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium">No Hidden Fees</h4>
                    <p className="text-sm text-gray-400">Transparent pricing with no surprises.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-theme-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-theme-blue text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Real-Time Updates</h4>
                    <p className="text-sm text-gray-400">Live exchange rates that update throughout the day.</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-theme-blue/20 flex items-center justify-center mt-0.5">
                    <span className="text-theme-blue text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Fast Transfers</h4>
                    <p className="text-sm text-gray-400">Money arrives in India within minutes in most cases.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 lg:w-2/5">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatesSection;
