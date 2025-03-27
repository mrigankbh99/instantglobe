
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Globe from './Globe';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements with New Gradient */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-10 md:pt-20 flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 order-2 md:order-1">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              International Money Transfers
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Send money to <span className="text-cyan-400">India</span> instantly with <span className="text-indigo-400">Google rates</span> and <span className="underline decoration-purple-400 decoration-2 underline-offset-4">Zero Fees</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Experience the fastest way to send money to India with real-time exchange rates and absolutely no hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Start Sending Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="border-white/20 hover:bg-white/5 text-white rounded-full px-8 py-6 text-lg font-medium">
              View Live Rates
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex -space-x-2">
              <img 
                src="https://randomuser.me/api/portraits/women/32.jpg" 
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-theme-dark"
              />
              <img 
                src="https://randomuser.me/api/portraits/men/54.jpg" 
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-theme-dark"
              />
              <img 
                src="https://randomuser.me/api/portraits/women/67.jpg" 
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-theme-dark"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-400">Trusted by</div>
              <div className="text-white font-medium">20,000+ customers</div>
            </div>
          </div>
        </div>
        
        {/* Globe Container - Making it slightly larger */}
        <div className="md:w-1/2 order-1 md:order-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="w-full h-[450px] md:h-[550px] lg:h-[650px] relative">
            <div className="absolute inset-0">
              <Globe />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Bar with new gradient */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-white/10 rounded-xl p-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center justify-center md:justify-start space-x-4 p-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Instant Transfers</h3>
              <p className="text-sm text-gray-400">Money delivered in minutes</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Secure & Safe</h3>
              <p className="text-sm text-gray-400">Bank-level encryption</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Zero Fees</h3>
              <p className="text-sm text-gray-400">No hidden charges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
