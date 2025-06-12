import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const trailCount = 5;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Update trail positions
      trailsRef.current.forEach((trail, i) => {
        if (trail) {
          setTimeout(() => {
            trail.style.left = `${e.clientX}px`;
            trail.style.top = `${e.clientY}px`;
          }, i * 50);
        }
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorOuterRef}
        className="fixed pointer-events-none z-50"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 1.5 : 1,
        }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #7000FF',
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out',
        }}
      />
      <motion.div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-50"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovered ? 0.5 : 1,
        }}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#00FF88',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px #00FF88',
        }}
      />
      {Array.from({ length: trailCount }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="fixed pointer-events-none z-40"
          style={{
            width: `${6 - i}px`,
            height: `${6 - i}px`,
            borderRadius: '50%',
            backgroundColor: '#00FF88',
            opacity: 0.3 - i * 0.05,
            transform: 'translate(-50%, -50%)',
            transition: `all ${0.1 + i * 0.04}s ease-out`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;