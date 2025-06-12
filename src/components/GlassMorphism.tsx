import React from 'react';
import { motion } from 'framer-motion';
import { GlassMorphismProps } from './GlassMorphism.types';

const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  intensity = 10,
  borderRadius = '0.5rem',
  depth = 1,
  className = '',
  hoverEffect = false,
}) => {
  // Calculate styles based on intensity and depth
  const glassOpacity = Math.min(intensity * 0.01, 0.4);
  const blurValue = `${intensity * 0.8}px`;
  const borderOpacity = Math.min(intensity * 0.015, 0.2);
  const shadowIntensity = depth * 0.05;
  
  const baseStyle = {
    backgroundColor: `rgba(255, 255, 255, ${glassOpacity})`,
    backdropFilter: `blur(${blurValue})`,
    WebkitBackdropFilter: `blur(${blurValue})`,
    borderRadius,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    boxShadow: `0 ${depth * 4}px ${depth * 8}px rgba(0, 0, 0, ${shadowIntensity})`,
    transition: 'all 0.3s ease',
  };

  if (!hoverEffect) {
    return (
      <div className={`glass-morphism ${className}`} style={baseStyle}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`glass-morphism ${className}`}
      style={baseStyle}
      whileHover={{ 
        y: -5,
        boxShadow: `0 ${depth * 6}px ${depth * 12}px rgba(0, 0, 0, ${shadowIntensity * 1.5})`,
        borderColor: 'rgba(0, 255, 136, 0.3)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export default GlassMorphism;