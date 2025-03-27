
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Set page title
    document.title = "InstantGlobe | Send Money to India Instantly";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-theme-dark">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Index;
