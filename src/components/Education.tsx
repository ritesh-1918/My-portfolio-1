import { useRef, FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';

interface EducationItem {
  id: string;
  year: string;
  title: string;
  institution: string;
  location: string;
  percentage?: string; // Added optional percentage field
}

const educationData: EducationItem[] = [
  {
    id: 'diploma',
    year: '2023-Present',
    title: 'Diploma in Electronics and Communication Engineering',
    institution: 'Sanketika Polytechnic College',
    location: 'Visakhapatnam, Andhra Pradesh',
    percentage: '8.1 GPA' // Add your actual percentage here
  },
  {
    id: 'school',
    year: '2013-2023',
    title: 'School Education (1st - 10th Grade)',
    institution: 'Bhasker High School',
    location: 'Parvathipuram, Andhra Pradesh',
    percentage: '86%' // Add your actual percentage here
  },
  {
    id: 'kindergarten',
    year: '2011-2013',
    title: 'Kindergarten Education (LKG & UKG)',
    institution: 'Marks Public School',
    location: 'Parvathipuram, Andhra Pradesh',
    percentage: '100%' // Add your actual percentage here
  }
]


const Education: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect for section title
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Use GlassMorphism context for consistent styling
  const { applyGlass } = useGlassMorphism();
  
  return (
    <section 
      id="education" 
      ref={containerRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <motion.div
          style={{ y: titleY, opacity }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">
            Educational Journey
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Explore my academic path from kindergarten to current studies
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
              className={`relative mb-16 flex flex-col items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Timeline dot */}
                <div className="absolute top-0 lg:top-1/2 left-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 w-5 h-5 rounded-full bg-primary border-2 border-background z-10"></div>
                
                {/* Year badge - now positioned independently */}
                {/* REMOVED: <div className={`absolute -top-4 z-20 ${index % 2 === 0 ? 'lg:left-[calc(50%+1.5rem)]' : 'lg:right-[calc(50%+1.5rem)]'}`}>
                  <div className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 rounded-lg text-center font-medium shadow-lg">
                    {item.year}
                  </div>
                </div> */}

                {/* Content card */}
                <div className={`w-full lg:w-6/12 mt-8 lg:mt-0 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'} relative overflow-hidden`}>
                  {/* Year badge positioned above the card */}
                  <div className="absolute top-0 left-0 w-full z-20">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-2 rounded-t-lg text-center font-medium shadow-lg">
                      {item.year}
                    </div>
                  </div>

                  {applyGlass(
                    <div className="relative pt-8"> {/* Added pt-12 to make space for the badge */}
                      
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
                      </div>
                    </div>
                  </div>,
                  {
                    intensity: 10,
                    borderRadius: '1rem',
                    depth: 2,
                    className: 'h-full overflow-hidden' // Added overflow-hidden
                  }
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;