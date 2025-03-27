
import React from 'react';
import { useGlobeScene } from '../hooks/useGlobeScene';

const Globe: React.FC = () => {
  const { mountRef, hoveredLocation } = useGlobeScene();

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[500px] relative"
    >
      {/* Very subtle background effect that won't compete with the Earth visibility */}
      <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/6 via-purple-500/4 to-emerald-500/6 rounded-full filter blur-3xl opacity-10 animate-pulse-glow"></div>
      
      {hoveredLocation && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 glassmorphism px-4 py-2 rounded-full text-sm animate-fade-in">
          {hoveredLocation}
        </div>
      )}
    </div>
  );
};

export default Globe;
