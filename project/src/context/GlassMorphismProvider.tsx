import React, { createContext, useContext, ReactNode } from 'react';
import GlassMorphism from '../components/GlassMorphism';

interface GlassOptions {
  intensity?: number;
  borderRadius?: string;
  depth?: number;
  className?: string;
  hoverEffect?: boolean;
}

interface GlassMorphismContextType {
  applyGlass: (children: ReactNode, options?: GlassOptions) => ReactNode;
}

const GlassMorphismContext = createContext<GlassMorphismContextType>({
  applyGlass: (children) => children
});

interface GlassMorphismProviderProps {
  children: ReactNode;
}

export const GlassMorphismProvider: React.FC<GlassMorphismProviderProps> = ({ children }) => {
  const applyGlass = (children: ReactNode, options: GlassOptions = {}) => {
    const {
      intensity = 10,
      borderRadius = '1rem',
      depth = 2,
      className = '',
      hoverEffect = true
    } = options;
    
    return (
      <GlassMorphism
        intensity={intensity}
        borderRadius={borderRadius}
        depth={depth}
        className={className}
        hoverEffect={hoverEffect}
      >
        {children}
      </GlassMorphism>
    );
  };
  
  return (
    <GlassMorphismContext.Provider value={{ applyGlass }}>
      {children}
    </GlassMorphismContext.Provider>
  );
};

export const useGlassMorphism = () => useContext(GlassMorphismContext);