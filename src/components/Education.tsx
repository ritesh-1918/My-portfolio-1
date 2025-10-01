import { useRef, FC, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';

interface EducationItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  location: string;
  percentage?: string;
  achievements?: string[];
  funnyMoments?: string[];
  friends?: string[];
  description?: string;
}

const educationData: EducationItem[] = [
  {
    id: 'diploma',
    year: '2023-Present',
    title: 'Diploma in Electronics and Communication Engineering',
    institution: 'Sanketika Polytechnic College',
    location: 'Visakhapatnam, Andhra Pradesh',
    percentage: '8.1 GPA',
    achievements: [
      'Top 5% in Electronics Circuit Design',
      'Best Project Award - Smart Home System',
      'Robotics Club President',
      'Hackathon Finalist 2024'
    ],
    funnyMoments: [
      'First lab experiment made the fire alarm go off',
      'Accidentally created a mini EMP that reset all digital clocks',
      'Our group project presentation had meme slides that professor actually liked',
      'Built a robot that kept chasing the college cat'
    ],
    friends: [
      'Rahul Sharma - Robotics Partner',
      'Priya Patel - Circuit Design Expert',
      'Arun Kumar - Coding Buddy',
      'Sneha Reddy - Project Manager'
    ],
    description: 'Specializing in embedded systems and IoT development with hands-on project experience.'
  },
  {
    id: 'school',
    year: '2013-2023',
    title: 'School Education (1st - 10th Grade)',
    institution: 'Bhasker High School',
    location: 'Parvathipuram, Andhra Pradesh',
    percentage: '86%',
    achievements: [
      'School Science Fair Winner 3 years in a row',
      'Math Olympiad District Level Finalist',
      'Chess Team Captain',
      'Best Student Award 2022'
    ],
    funnyMoments: [
      'Got caught building a mini rocket in chemistry lab',
      'Our class prank involved reprogramming the school bell',
      'Science teacher thought my volcano project was actually erupting',
      'Organized a coding club that turned into a meme-making factory'
    ],
    friends: [
      'Kiran Mehta - Science Partner',
      'Anjali Joshi - Math Whiz',
      'Vikram Singh - Sports Captain',
      'Neha Gupta - Art Prodigy'
    ],
    description: 'Foundation years where I discovered my passion for technology and innovation.'
  },
  {
    id: 'kindergarten',
    year: '2011-2013',
    title: 'Kindergarten Education (LKG & UKG)',
    institution: 'Marks Public School',
    location: 'Parvathipuram, Andhra Pradesh',
    percentage: '100%',
    achievements: [
      'Best Story Teller Award',
      'Block Building Competition Winner',
      'Perfect Attendance Certificate',
      'Creative Drawing Champion'
    ],
    funnyMoments: [
      'Tried to build a "computer" with cardboard and crayons',
      'Convinced classmates my lunchbox was a robot',
      'Our sandcastle was so big teacher had to help us destroy it',
      'Got the whole class to believe I could talk to computers'
    ],
    friends: [
      'Rohit - Block Building Partner',
      'Sonia - Art Corner Buddy',
      'Amit - Lunchtime Story Listener',
      'Pooja - Sandcastle Architect'
    ],
    description: 'Where the first sparks of creativity and curiosity were ignited.'
  }
];

const Education: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const [selectedEducation, setSelectedEducation] = useState<EducationItem | null>(null);
  const [activeTab, setActiveTab] = useState<'achievements' | 'funny' | 'friends'>('achievements');

  // Parallax effect for section title
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Use GlassMorphism context for consistent styling
  const { applyGlass } = useGlassMorphism();

  const openModal = (education: EducationItem) => {
    setSelectedEducation(education);
    setActiveTab('achievements');
  };

  const closeModal = () => {
    setSelectedEducation(null);
  };

  return (
    <section id="education" ref={containerRef} className="min-h-screen py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div style={{ y: titleY, opacity }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Educational Journey
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Click on any education card to explore memories, achievements, and friends
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-primary rounded-full"></div>

          {/* Education items */}
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-16 flex flex-col items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
            >
              {/* Timeline dot */}
              <div className="absolute top-0 lg:top-1/2 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background z-10"></div>

              {/* Content card */}
              <div className={`w-full lg:w-6/12 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'} relative overflow-hidden`}>
                {/* Year badge positioned above the card */}
                <div className="absolute top-0 left-0 w-full z-20">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-2 rounded-t-lg text-center font-medium shadow-lg">
                    {item.year}
                  </div>
                </div>
                {applyGlass(
                  <motion.div 
                    className="relative pt-8 cursor-pointer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal(item)}
                  >
                    <div className="p-6 lg:pt-6">
                      <h3 className="text-lg sm:text-xl font-bold gradient-text mb-2">{item.title}</h3>
                      <h4 className="text-primary font-medium mb-2">{item.institution}</h4>
                      <div className="flex flex-col space-y-2">
                        {/* Location with icon */}
                        <div className="flex items-center text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{item.location}</span>
                        </div>
                        {/* Percentage with icon - only show if percentage exists */}
                        {item.percentage && (
                          <div className="flex items-center text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>Academic Score: {item.percentage}</span>
                          </div>
                        )}
                        {/* Click hint */}
                        <div className="flex items-center text-primary text-sm mt-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                          Click to explore memories
                        </div>
                      </div>
                    </div>
                  </motion.div>,
                  { intensity: 10, borderRadius: '1rem', depth: 2, className: 'h-full overflow-hidden' }
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedEducation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {applyGlass(
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold gradient-text">{selectedEducation.title}</h2>
                      <p className="text-primary font-medium">{selectedEducation.institution}</p>
                      <p className="text-gray-400 text-sm">{selectedEducation.year} • {selectedEducation.location}</p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white transition-colors p-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-6">{selectedEducation.description}</p>

                  {/* Tab Navigation */}
                  <div className="flex space-x-1 mb-6 bg-gray-800 rounded-lg p-1">
                    {[
                      { key: 'achievements' as const, label: 'Achievements', icon: '🏆' },
                      { key: 'funny' as const, label: 'Funny Moments', icon: '😄' },
                      { key: 'friends' as const, label: 'Friends', icon: '👥' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
                          activeTab === tab.key
                            ? 'bg-primary text-white shadow-lg'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="max-h-96 overflow-y-auto">
                    {activeTab === 'achievements' && (
                      <div className="space-y-3">
                        {selectedEducation.achievements?.map((achievement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-3 bg-gray-800 rounded-lg"
                          >
                            <span className="text-primary mr-3 mt-1">🏆</span>
                            <span className="text-gray-300">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'funny' && (
                      <div className="space-y-3">
                        {selectedEducation.funnyMoments?.map((moment, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start p-3 bg-gray-800 rounded-lg"
                          >
                            <span className="text-yellow-400 mr-3 mt-1">😂</span>
                            <span className="text-gray-300">{moment}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'friends' && (
                      <div className="space-y-3">
                        {selectedEducation.friends?.map((friend, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 bg-gray-800 rounded-lg"
                          >
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">
                                {friend.split(' ')[0][0]}
                              </span>
                            </div>
                            <span className="text-gray-300">{friend}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Academic Score */}
                  {selectedEducation.percentage && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-primary to-secondary rounded-lg text-center">
                      <p className="text-white font-bold text-lg">
                        Academic Score: {selectedEducation.percentage}
                      </p>
                    </div>
                  )}
                </div>,
                { intensity: 15, borderRadius: '1.5rem', depth: 3 }
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;
