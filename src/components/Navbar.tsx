import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'featured', label: 'Featured' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Determine active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      if (sectionElements.length) {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        let currentSection = '';
        
        for (let i = sectionElements.length - 1; i >= 0; i--) {
          const section = sectionElements[i];
          if (section.element) {
            const offsetTop = section.element.offsetTop;
            
            if (scrollPosition >= offsetTop) {
              currentSection = section.id;
              break;
            }
          }
        }
        
        if (activeSection !== currentSection) {
          setActiveSection(currentSection);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, activeSection, sections]);

  return (
    <>
      {/* Top navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 py-4 ${
          scrolled ? 'bg-black bg-opacity-80 backdrop-blur-lg' : ''
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white"
          >
            <span className="text-primary">Ritesh</span>
          </motion.div>

          {/* Desktop navigation */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex items-center space-x-8"
          >
            {sections.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative text-white navbar-link py-2 hover:text-primary transition-colors ${
                  activeSection === item.id ? 'text-primary' : ''
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary w-full"
                    layoutId="activeSection"
                  />
                )}
              </motion.a>
            ))}

            {/* CV Download Button */}
            {/* Removed the following block to remove the Download CV button from desktop navigation */}
            {/*
            <motion.a
              href="/assets/my-cv.pdf"
              download="Ritesh-Bonthalakoti-CV.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download CV"
            >
              <FaFileDownload className="w-4 h-4" />
              <span>Download CV</span>
            </motion.a>
            */}
          </motion.nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed right-0 top-0 h-full w-64 bg-background p-6"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-lg ${
                      activeSection === item.id ? 'text-primary' : 'text-white'
                    } hover:text-primary transition-colors`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                
                {/* Mobile CV Download Button */}
                {/* Removed the following block to remove the Download CV button from mobile navigation */}
                {/*
                <a
                  href="/assets/my-cv.pdf"
                  download="Ritesh-Bonthalakoti-CV.pdf"
                  className="flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-300 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaFileDownload className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
                */}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;