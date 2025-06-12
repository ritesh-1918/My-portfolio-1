import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Experience } from './types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement to track cursor position relative to card
  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full aspect-[4/3] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          // Change this line in the animate object
          scale: isHovered ? 1.15 : 1, // Increased from 1.05 to 1.15 for more noticeable effect
          transition: { duration: 0.6, type: 'spring' }
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: isHovered ? 
            `${(mousePosition.x / (cardRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (cardRef.current?.offsetHeight || 1)) * 100}%` : 
            'center center'
        }}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 w-full h-full p-6 backface-hidden">
          <div className="h-full flex flex-col">
            {/* Role with typing effect */}
            <motion.h3
              className="text-2xl font-bold gradient-text mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              {experience.role}
            </motion.h3>

            {/* Company and Duration */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary font-semibold">{experience.company}</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">{experience.duration}</span>
                <div
                  className="h-1 w-20 bg-gray-700 rounded-full overflow-hidden"
                  style={{ transform: 'translateZ(0)' }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${experience.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Key Achievements with particle trails */}
            <ul className="space-y-3 flex-grow">
              {experience.achievements.map((achievement, i) => (
                <motion.li
                  key={i}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                >
                  <span className="text-primary mt-1">•</span>
                  <span className="text-gray-300">{achievement}</span>
                </motion.li>
              ))}
            </ul>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              {experience.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    background: `linear-gradient(135deg, var(--primary) ${i * 20}%, var(--secondary))`
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div
          className="absolute inset-0 w-full h-full p-6 backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="h-full flex flex-col">
            <h4 className="text-xl font-bold gradient-text mb-4">Project Highlights</h4>
            {experience.projects.map((project, i) => (
              <motion.div
                key={i}
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
              >
                <h5 className="text-primary font-semibold mb-2">{project.name}</h5>
                <p className="text-gray-300 text-sm">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-secondary transition-colors mt-2 inline-block"
                  >
                    View Project →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};