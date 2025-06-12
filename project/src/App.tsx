import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import WorkExperience from './components/WorkExperience/WorkExperience';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import Projects from './components/Projects';
import FeaturedProjects from './components/FeaturedProjects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import FloatingCVButton from './components/FloatingCVButton';

function App() {
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden font-poppins text-white">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Skills />
        <WorkExperience />
        <Certificates />
        <Projects />
        <FeaturedProjects />
        <Blog />
        <Contact />
        <Footer />
        <FloatingCVButton />
      </div>
    </div>
  );
}

export default App;