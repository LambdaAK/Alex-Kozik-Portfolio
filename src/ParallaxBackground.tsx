import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxLayer {
  id: string;
  speed: number;
  opacity: number;
  color: string;
  size: string;
  count: number;
}

const ParallaxBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const updateScrollY = () => setScrollY(window.scrollY);
    const updateWindowHeight = () => setWindowHeight(window.innerHeight);
    
    updateWindowHeight();
    window.addEventListener('scroll', updateScrollY);
    window.addEventListener('resize', updateWindowHeight);
    
    return () => {
      window.removeEventListener('scroll', updateScrollY);
      window.removeEventListener('resize', updateWindowHeight);
    };
  }, []);

  // Calculate scroll progress (0 to 1)
  const scrollProgress = Math.min(scrollY / (document.documentElement.scrollHeight - windowHeight), 1);

  // Dynamic background colors based on scroll - much lighter with smooth transitions
  const getBackgroundColor = () => {
    if (scrollProgress < 0.25) {
      // Top: Very light pink to lavender
      return 'from-pink-50 via-purple-50 to-blue-50';
    } else if (scrollProgress < 0.5) {
      // Education: Light blue to soft cyan (blends from previous)
      return 'from-blue-50 via-cyan-50 to-teal-50';
    } else if (scrollProgress < 0.75) {
      // Experience: Soft teal to mint (blends from previous)
      return 'from-teal-50 via-emerald-50 to-green-50';
    } else {
      // Projects: Light green to soft lavender (cycles back smoothly)
      return 'from-green-50 via-indigo-50 to-purple-50';
    }
  };

  const getDarkBackgroundColor = () => {
    if (scrollProgress < 0.25) {
      return 'dark:from-gray-900 dark:via-slate-900 dark:to-gray-900';
    } else if (scrollProgress < 0.5) {
      return 'dark:from-slate-900 dark:via-gray-900 dark:to-slate-900';
    } else if (scrollProgress < 0.75) {
      return 'dark:from-gray-900 dark:via-slate-900 dark:to-gray-900';
    } else {
      return 'dark:from-slate-900 dark:via-gray-900 dark:to-slate-900';
    }
  };

  // Parallax layers with much slower speeds and lighter colors
  const layers: ParallaxLayer[] = [
    { id: 'layer1', speed: 0.02, opacity: 0.2, color: 'bg-white', size: 'w-1 h-1', count: 50 },
    { id: 'layer2', speed: 0.05, opacity: 0.3, color: 'bg-blue-100', size: 'w-2 h-2', count: 30 },
    { id: 'layer3', speed: 0.08, opacity: 0.4, color: 'bg-purple-100', size: 'w-3 h-3', count: 20 },
    { id: 'layer4', speed: 0.12, opacity: 0.25, color: 'bg-pink-100', size: 'w-1.5 h-1.5', count: 40 }
  ];

  const generateElements = (layer: ParallaxLayer) => {
    return Array.from({ length: layer.count }, (_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 200; // Extended height for parallax
      const delay = Math.random() * 2;
      
      return (
        <motion.div
          key={`${layer.id}-${i}`}
          className={`absolute ${layer.size} ${layer.color} dark:bg-gray-400 rounded-full opacity-${Math.floor(layer.opacity * 100)}`}
          style={{
            left: `${left}%`,
            top: `${top}vh`,
            transform: `translateY(${scrollY * layer.speed}px)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [layer.opacity * 0.5, layer.opacity, layer.opacity * 0.5],
          }}
          transition={{
            duration: 3 + delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
        />
      );
    });
  };

  // Floating geometric shapes
  const geometricShapes = Array.from({ length: 15 }, (_, i) => {
    const shapes = ['circle', 'triangle', 'square', 'diamond'];
    const shape = shapes[i % shapes.length];
    const left = Math.random() * 100;
    const top = Math.random() * 150;
    const size = 20 + Math.random() * 40;
    const rotationSpeed = 0.03 + Math.random() * 0.05;
    
    return (
      <motion.div
        key={`shape-${i}`}
        className="absolute opacity-20 dark:opacity-10"
        style={{
          left: `${left}%`,
          top: `${top}vh`,
          transform: `translateY(${scrollY * rotationSpeed}px) rotate(${scrollY * 0.02}deg)`,
        }}
      >
        {shape === 'circle' && (
          <div 
            className="rounded-full border border-blue-200 dark:border-blue-600"
            style={{ width: size, height: size }}
          />
        )}
        {shape === 'triangle' && (
          <div 
            className="border-l border-r border-b border-transparent border-b-purple-200 dark:border-b-purple-600"
            style={{ 
              width: 0, 
              height: 0, 
              borderLeftWidth: size/2,
              borderRightWidth: size/2,
              borderBottomWidth: size * 0.866
            }}
          />
        )}
        {shape === 'square' && (
          <div 
            className="border border-green-200 dark:border-green-600"
            style={{ width: size, height: size }}
          />
        )}
        {shape === 'diamond' && (
          <div 
            className="border border-pink-200 dark:border-pink-600 transform rotate-45"
            style={{ width: size * 0.7, height: size * 0.7 }}
          />
        )}
      </motion.div>
    );
  });

  // Shooting stars with parallax
  const shootingStars = Array.from({ length: 5 }, (_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = 3 + Math.random() * 2;
    
    return (
      <motion.div
        key={`shooting-${i}`}
        className="absolute w-1 h-1 bg-white dark:bg-gray-200 rounded-full"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          transform: `translateY(${scrollY * 0.04}px)`,
        }}
        animate={{
          x: [0, 300],
          y: [0, -300],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "easeOut",
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
      {/* Dynamic gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ease-in-out ${getBackgroundColor()} ${getDarkBackgroundColor()}`}
      />
      
      {/* Parallax particle layers */}
      {layers.map(layer => (
        <div key={layer.id} className="absolute inset-0">
          {generateElements(layer)}
        </div>
      ))}
      
      {/* Geometric shapes */}
      <div className="absolute inset-0">
        {geometricShapes}
      </div>
      
      {/* Shooting stars */}
      <div className="absolute inset-0">
        {shootingStars}
      </div>
      
      {/* Scroll-based overlay effects */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-white/5"
        style={{
          opacity: scrollProgress * 0.3,
        }}
      />
    </div>
  );
};

export default ParallaxBackground;