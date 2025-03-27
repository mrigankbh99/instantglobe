
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Globe from './Globe';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast";

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
  
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements with New Gradient - Making flares smaller */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/15 rounded-full filter blur-3xl"></div>
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
            <span className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
              International Money Transfers
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Send money to <span className="text-cyan-400">India</span> instantly with <span className="text-indigo-400">Google rates</span> and <span className="underline decoration-purple-400 decoration-2 underline-offset-4">Zero Fees</span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8 max-w-xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Experience the fastest way to send money to India with real-time exchange rates and absolutely no hidden fees.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-5 sm:px-8 sm:py-6 text-lg font-medium transition-all duration-300 transform hover:scale-105">
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="border-white/20 hover:bg-white/5 text-white rounded-full px-6 py-5 sm:px-8 sm:py-6 text-lg font-medium">
              View Live Rates
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center md:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center text-gray-300/80 hover:text-white transition-colors duration-200">
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
      
      {/* Features Bar with new gradient */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-10 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Instant Transfers</h3>
              <p className="text-xs md:text-sm text-gray-400">Money delivered in minutes</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Google Rates</h3>
              <p className="text-xs md:text-sm text-gray-400">Real-time exchange rates</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start space-x-4 p-2 md:p-4">
            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-600/20 flex items-center justify-center">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Zero Fees</h3>
              <p className="text-xs md:text-sm text-gray-400">No hidden charges</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Waitlist Section */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 mt-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Waitlist</h2>
            <p className="text-gray-300 mb-6">Be the first to know when we launch. Get early access and exclusive offers.</p>
            
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join Now'}
                {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
            
            <div className="mt-4 flex items-center justify-center text-sm text-gray-400">
              <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-400" />
              <span>We'll never share your email with anyone else</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
