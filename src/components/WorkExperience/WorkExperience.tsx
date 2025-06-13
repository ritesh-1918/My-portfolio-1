import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Timeline3D } from './Timeline3D';
import { experienceData } from './data';
import { Experience } from './types';

const ExperienceCard = ({ experience, index, onClick }: { experience: Experience; index: number; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-background border border-white border-opacity-10 rounded-xl p-4 overflow-hidden flex flex-col h-full cursor-pointer hover:border-primary hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="flex-grow">
        <h3 className="text-lg font-bold mb-2 gradient-text">{experience.role}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-primary font-semibold">{experience.company}</span>
          <span className="text-sm text-gray-400">{experience.duration}</span>
        </div>
        
        {/* Key Achievements - show only first 2 */}
        <div className="space-y-2 mb-3">
          {experience.achievements.slice(0, 2).map((achievement, i) => (
            <div key={i} className="flex items-start space-x-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-gray-300">{achievement}</span>
            </div>
          ))}
          {experience.achievements.length > 2 && (
            <div className="text-xs text-primary">+{experience.achievements.length - 2} more achievements</div>
          )}
        </div>
      </div>
      
      <div className="mt-auto pt-3 border-t border-white border-opacity-10">
        <div className="flex flex-wrap gap-2">
          {experience.skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `var(--primary)15`,
                color: 'var(--primary)',
              }}
            >
              {skill}
            </span>
          ))}
          {experience.skills.length > 3 && (
            <span className="text-xs text-gray-400">+{experience.skills.length - 3} more</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const WorkExperience = () => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Define categories based on your data types
  const categories: Array<'All' | Experience['category']> = ['All', 'Internship', 'Full-time', 'Part-time', 'Freelance', 'Volunteer'];
  
  // Filter experiences based on active category
  const filteredExperiences = activeCategory === 'All' 
    ? experienceData 
    : experienceData.filter(exp => exp.category === activeCategory);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const scrollProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-20 bg-background bg-opacity-50" ref={containerRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Work & Experience</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Journey through my professional timeline and explore my career path
          </p>
        </motion.div>

        <div className="relative h-[500px] w-full mb-20">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Timeline3D scrollProgress={scrollProgress} />
          </Canvas>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm transition-colors ${
                category === activeCategory 
                  ? 'bg-primary bg-opacity-20 text-primary' 
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10 hover:text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredExperiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                onClick={() => setSelectedExperience(experience)}
              />
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {selectedExperience && (
            <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const ExperienceModal = ({ experience, onClose }: { experience: Experience; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold gradient-text">{experience.role}</h2>
                <div className="flex items-center mt-2">
                  <span className="text-primary font-semibold">{experience.company}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-400">{experience.duration}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">Key Achievements</h3>
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-gray-300">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {experience.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: `var(--primary)15`,
                        color: 'var(--primary)',
                        border: `1px solid var(--primary)30`,
                        boxShadow: `0 0 10px var(--primary)15`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 gradient-text">Project Highlights</h3>
                <div className="space-y-4">
                  {experience.projects.map((project, i) => (
                    <div key={i} className="bg-white bg-opacity-5 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">{project.name}</h4>
                      <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-secondary transition-colors inline-flex items-center gap-1"
                        >
                          View Project
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
};

export default WorkExperience;