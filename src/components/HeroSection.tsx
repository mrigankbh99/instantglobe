
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Globe from './Globe';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";
import HomeConverterWidget from './HomeConverterWidget';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      toast({
        title: "You've joined the waitlist!",
        description: "We'll notify you when we launch.",
        duration: 5000,
      });
    }, 1000);
  };
  
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist-section');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements with Modern Gradient */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-10 left-10 w-96 h-96 bg-theme-blue/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-theme-cyan/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-theme-magenta/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-5 md:pt-20 flex flex-col md:flex-row items-center">
        {/* Globe Container - Only render at top for mobile with increased height */}
        {isMobile && (
          <div className="w-full mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-full h-[300px] relative">
              <div className="absolute inset-0">
                <Globe />
              </div>
            </div>
          </div>
        )}
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 order-2 md:order-1">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block bg-gradient-to-r from-theme-blue/20 to-theme-cyan/20 text-white text-xs font-medium px-4 py-1.5 rounded-xl mb-4 backdrop-blur-sm border border-white/10">
              International Money Transfers
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-space leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Send money to <span className="text-theme-cyan">India</span> instantly with <span className="gradient-text">Google rates</span> and <span className="relative inline-block px-1">
              <span className="relative z-10">Zero Fees</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-theme-magenta/20 -skew-x-12 -z-10"></span>
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Experience the fastest way to send money to India with real-time exchange rates and absolutely no hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button 
              className="gradient-btn text-white rounded-xl px-6 py-5 sm:px-8 sm:py-6 text-lg font-medium transition-all duration-300 shadow-lg"
              onClick={scrollToWaitlist}
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-xl px-6 py-5 sm:px-8 sm:py-6 text-lg font-medium backdrop-blur-sm">
              View Live Rates
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center text-gray-300/80 hover:text-white transition-colors duration-200 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
              <img 
                src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" 
                alt="USDC Logo"
                className="w-5 h-5 mr-2 opacity-80"
              />
              <span className="text-xs font-medium">Powered by Stablecoins</span>
            </div>
          </div>
        </div>
        
        {/* Globe Container - Desktop only */}
        {!isMobile && (
          <div className="md:w-1/2 order-1 md:order-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="w-full h-[450px] md:h-[550px] lg:h-[650px] relative">
              <div className="absolute inset-0">
                <Globe />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Features Bar with modern gradient */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="glass-card rounded-2xl p-4 md:p-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-theme-blue/30 to-theme-cyan/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium font-space">Instant Transfers</h3>
              <p className="text-xs md:text-sm text-gray-400">Money delivered in minutes</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-theme-blue/30 to-theme-cyan/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium font-space">Google Rates</h3>
              <p className="text-xs md:text-sm text-gray-400">Real-time exchange rates</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-theme-blue/30 to-theme-cyan/30 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium font-space">Zero Fees</h3>
              <p className="text-xs md:text-sm text-gray-400">No hidden charges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Currency Converter Widget */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-10 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <div className="glass-card rounded-2xl p-6 md:p-8 mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left lg:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold font-space mb-4">Try Our Currency Converter</h2>
                <p className="text-gray-300 mb-6">Get real-time exchange rates and calculate how much your recipient will receive when you send money to India.</p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="bg-theme-dark/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 w-32">
                    <div className="text-xs text-theme-cyan mb-1">USD → INR</div>
                    <div className="text-xl font-semibold font-space">₹83.24</div>
                  </div>
                  <div className="bg-theme-dark/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 w-32">
                    <div className="text-xs text-theme-cyan mb-1">GBP → INR</div>
                    <div className="text-xl font-semibold font-space">₹104.75</div>
                  </div>
                  <div className="bg-theme-dark/70 backdrop-blur-sm border border-white/10 rounded-xl p-4 w-32">
                    <div className="text-xs text-theme-cyan mb-1">AED → INR</div>
                    <div className="text-xl font-semibold font-space">₹22.65</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <HomeConverterWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
