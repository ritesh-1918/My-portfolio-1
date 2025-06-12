import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import debounce from 'lodash/debounce';

interface KineticTextProps {
  text: string;
  className?: string;
  intensity?: number; // Controls how much the text reacts to cursor
  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  hoverColor?: string; // Color when hovered
  transitionSpeed?: number; // Animation transition speed in seconds
  elasticity?: number; // Elasticity of the animation (0-1)
}

const KineticText = ({
  text,
  className = '',
  intensity = 0.05,
  color = 'white',
  fontSize = '1rem',
  fontWeight = 'normal',
  hoverColor,
  transitionSpeed = 0.3,
  elasticity = 0.3,
}: KineticTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Split text into individual characters for animation
  const letters = text.split('');
  
  // Create a debounced version of the animation update function
  const debouncedAnimationUpdate = useCallback(
    debounce((mouseX: number, mouseY: number, rect: DOMRect) => {
      lettersRef.current.forEach((letter, index) => {
        if (!letter) return;
        
        // Calculate letter position within container
        const letterRect = letter.getBoundingClientRect();
        const letterCenterX = letterRect.left + letterRect.width / 2 - rect.left;
        const letterCenterY = letterRect.top + letterRect.height / 2 - rect.top;
        
        // Calculate distance from letter to mouse
        const distanceX = mouseX - letterCenterX;
        const distanceY = mouseY - letterCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Calculate movement based on distance (closer = more movement)
        const maxDistance = Math.max(rect.width, rect.height) / 2;
        const normalizedDistance = Math.min(distance / maxDistance, 1);
        const moveFactor = (1 - normalizedDistance) * intensity;
        
        // Apply animation with GSAP
        gsap.to(letter, {
          x: -distanceX * moveFactor,
          y: -distanceY * moveFactor,
          rotationZ: -distanceX * moveFactor * 2,
          scale: 1 + moveFactor * 0.5,
          color: hoverColor || color,
          duration: transitionSpeed,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    }, 5), // 5ms debounce time for smooth performance
    [intensity, hoverColor, color, transitionSpeed]
  );
  
  useEffect(() => {
    // Initialize refs array
    lettersRef.current = lettersRef.current.slice(0, letters.length);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      // Get container dimensions and position
      const rect = containerRef.current.getBoundingClientRect();
      const containerCenterX = rect.left + rect.width / 2;
      const containerCenterY = rect.top + rect.height / 2;
      
      // Calculate mouse position relative to container center
      const mouseX = e.clientX - containerCenterX;
      const mouseY = e.clientY - containerCenterY;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Use the debounced animation update function
      debouncedAnimationUpdate(mouseX, mouseY, rect);
    };
    
    // Reset animation when mouse leaves
    const handleMouseLeave = () => {
      lettersRef.current.forEach((letter) => {
        if (!letter) return;
        
        gsap.to(letter, {
          x: 0,
          y: 0,
          rotationZ: 0,
          scale: 1,
          color: color,
          duration: 0.5,
          ease: `elastic.out(1, ${elasticity})`,
          overwrite: 'auto',
          clearProps: 'transform',
        });
      });
    };
    
    // Initial animation to ensure letters are properly positioned
    gsap.set(lettersRef.current, {
      x: 0,
      y: 0,
      rotationZ: 0,
      scale: 1,
      color: color,
    });
    
    window.addEventListener('mousemove', handleMouseMove);
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [letters.length, intensity, debouncedAnimationUpdate, color, elasticity]);
  
  return (
    <div 
      ref={containerRef} 
      className={`kinetic-text-container ${className}`}
      style={{ 
        display: 'inline-block',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {letters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          ref={(el) => (lettersRef.current[index] = el)}
          className="kinetic-letter"
          style={{
            display: 'inline-block',
            color,
            fontSize,
            fontWeight,
            willChange: 'transform, color',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            transition: `color ${transitionSpeed}s ease`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </div>
  );
};

export default KineticText;