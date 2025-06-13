import { motion, AnimatePresence } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';
import { CodeBracketIcon as GitHubIcon } from '@heroicons/react/24/outline';
import { EyeIcon as ExternalLinkIcon } from '@heroicons/react/24/outline';

interface Project {
  title: string;
  description: string;
  tags: string[];
  skills: string[];
  images: string[];
  links: {
    github?: string;
    live?: string;
  };
  longDescription: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectCard = ({ project, index, onClick }: {
  project: Project;
  index: number;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-background border border-white border-opacity-10 rounded-xl p-4 cursor-pointer transition-colors hover:border-primary"
      onClick={onClick}
    >
      <h3 className="text-base sm:text-lg font-bold mb-2 gradient-text">{project.title}</h3>
      <p className="text-xs sm:text-sm text-gray-300 mb-3">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-1 bg-white bg-opacity-5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
 
const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % project.images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(prev => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-background rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-2 z-10 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Image display section - keeping only one instance */}
        <div className="relative mb-6">
          <img
            src={project.images[currentImageIndex]}
            alt="Project screenshot"
            className="rounded-lg object-contain w-full h-96"
          />
          
          {project.images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-70"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Project details */}
        <h2 className="text-xl sm:text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-gray-300 text-sm sm:text-base mb-6">{project.longDescription}</p>
        
        {/* Skills tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary bg-opacity-20 text-primary rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Links moved to bottom */}
        {/* Link buttons */}
        <div className="mt-8 flex gap-4 justify-end">
         
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
            >
              <GitHubIcon className="w-5 h-5 text-white" />
              <span className="font-bold text-sm sm:text-base">GitHub</span>
            </a>
          )}
          {project.links.live && (
            <a
              href={project.links.live}
              className="px-4 py-2 bg-primary bg-opacity-20 hover:bg-opacity-30 text-primary rounded-lg flex items-center gap-2"
            >
              <ExternalLinkIcon className="w-5 h-5" />
              <span className="text-sm sm:text-base">Live Preview</span>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // In the project data array, ensure images array has unique entries
  const projects: Project[] = [
    // Newest projects should be at the top of this list
    {
      title: 'RaceXplorer',
      description: 'A comprehensive Formula 1 statistics and visualization platform',
      longDescription: 'RaceXplorer is a comprehensive Formula 1 statistics and visualization platform that provides fans with detailed insights into race results, driver performances, and team standings. The application features interactive charts, historical data analysis, and real-time updates during race weekends.',
      tags: ['Web App', 'Data Visualization', 'Sports'],
      skills: ['React', 'D3.js', 'Node.js', 'MongoDB', 'REST API'],
      images: [
        '/images/projects/Racexplorer Pic.jpg',
        '/images/projects/5.jpg'
      ],
      links: {
        live: 'https://racexplorer.com',
        github: 'https://github.com/yourusername/racexplorer'
      }
    },
    {
      title: 'Nexora',
      description: 'An interactive tool to calculate and improve home satisfaction scores',
      longDescription: 'The House Happiness Calculator is an innovative web application that helps users evaluate and improve their home satisfaction. It analyzes various factors like space utilization, natural light, noise levels, and accessibility to generate a comprehensive happiness score. Users receive personalized recommendations to enhance their living environment based on their specific needs and preferences.',
      tags: ['Web App', 'Lifestyle', 'Real Estate'],
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'Chart.js', 'Firebase'],
      images: [
        '/images/projects/6.png'
      ],
      links: {
        live: 'https://nexora-digital-renaissance.lovable.app/',
        github: 'https://github.com/ritesh-1918/Nexora-'
      }
    },
    {
      title: '3D Portfolio',
      description: 'An interactive 3D portfolio website built with Three.js and React',
      longDescription: 'This portfolio website showcases my work through an immersive 3D experience. Built with Three.js and React, it features interactive 3D models, particle effects, and smooth animations. The site is fully responsive and optimized for performance across all devices.',
      tags: ['Web Design', 'Portfolio', '3D Graphics'],
      skills: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      images: [
        '/images/projects/3D Portfolio.png'
      ],
      links: {
        live: 'https://ritesh1918.netlify.app/',
        github: 'https://github.com/yourusername/3d-portfolio'
      }
    },
    {
      title: 'Code Buddy',
      description: 'AI-powered coding assistant and learning platform',
      longDescription: 'Code Buddy is an AI-powered coding assistant and learning platform designed to help developers write better code faster. It features real-time code suggestions, error detection, best practice recommendations, and interactive tutorials for various programming languages and frameworks.',
      tags: ['AI', 'Developer Tools', 'Education'],
      skills: ['Python', 'TensorFlow', 'React', 'Node.js', 'MongoDB'],
      images: [
        '/images/projects/code buddy.png'
      ],
      links: {
        live: 'https://codebuddy-learn-launch.lovable.app/',
        github: 'https://github.com/ritesh-1918/codebuddy-learn-launch'
      }
    },
    
    {
      title: 'Task Sync',
      description: 'A productivity tool for managing tasks and projects.',
      longDescription: 'A comprehensive task management application that helps users organize their work and personal projects. Features include task creation, due dates, priority levels, team collaboration, and progress tracking.',
      tags: ['Productivity', 'Management', 'Tasks'],
      skills: ['Vue.js', 'Firebase', 'Tailwind CSS'],
      images: [
        '/images/projects/7.png',
        '/images/projects/8.png', // Add your new image paths here
        '/images/projects/9.png'  // And here
      ],
      links: {
        live: 'https://studio--tasksync-jv6cg.us-central1.hosted.app/dashboard'
      }
    },
    {
      title: 'Weather Dashboard',
      description: 'Real-time weather information with interactive visualizations.',
      longDescription: 'An interactive weather dashboard that provides real-time weather data and forecasts. Features include location-based weather, interactive maps, temperature trends, and severe weather alerts.',
      tags: ['Weather', 'Dashboard', 'API'],
      skills: ['React', 'D3.js', 'Weather API'],
      images: [
        
        
        '/images/projects/10.png',
        '/images/projects/11.png'
      ] ,
      links: {
        github: 'https://github.com/ritesh-1918/ClimaSpace',
        live: 'https://clima-spacee.vercel.app/'
      }
    },
    {
      title: 'Dish Harmony',
      description: 'Full-stack recipe sharing platform',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      skills: ['React', 'Redux', 'Node.js', 'MongoDB', 'JWT Auth'],
      images: [
        '/images/projects/1.png',
        '/images/projects/2.png',
        '/images/projects/3.png',
        '/images/projects/4.png'
      ],
      links: {
        github: 'https://github.com/ritesh-1918/Recipe-App',
      },
      longDescription: 'A full-stack recipe sharing application...'
    },
    
  ];



  // Calculate total pages based on showing 3 projects per page
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Get current page projects
  const currentProjects = projects.slice(currentPage * projectsPerPage, (currentPage * projectsPerPage) + projectsPerPage);
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="projects" className="py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-12">My Projects</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm">
            Explore my portfolio of web development projects, interactive tools, and UI/UX showcases.
          </p>
        </motion.div>

        <div className="relative px-8 md:px-12">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 z-10">
            <motion.button
              onClick={prevPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 z-10">
            <motion.button
              onClick={nextPage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Project Cards */}
          <AnimatePresence mode="wait">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {currentProjects.map((project, index) => (
                <ProjectCard 
                  key={`${currentPage}-${index}`} 
                  project={project} 
                  index={index} 
                  onClick={() => setSelectedProject(project)} 
                />
              ))}
            </div>
          </AnimatePresence>
          
          {/* Page Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-primary' : 'bg-gray-500'}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// Helper function for skill/tag colors
const getSkillColor = (tag: string): string => {
  const colors: { [key: string]: string } = {
    'React': '#61dafb',
    'TypeScript': '#3178c6',
    'Next.js': '#000000',
    'Three.js': '#049ef4',
    'MongoDB': '#47A248',
    'AWS': '#FF9900',
    'OpenAI API': '#00A67E',
    'GSAP': '#88CE02',
    'Node.js': '#339933',
    'WebSocket': '#010101',
    'TailwindCSS': '#38B2AC',
    'Express': '#000000',
    'Redux': '#764ABC',
    'Firebase': '#FFCA28',
    'PostgreSQL': '#336791',
    'Docker': '#2496ED',
    'GraphQL': '#E10098'
  };
  return colors[tag] || '#00ff88';
};

export default Projects;