import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';

interface Certificate {
  id: string;
  name: string;
  image: string;
}

// Updated certificate data with your actual certificates
const certificateData: Certificate[] = [
  // Newest certificates should be at the top of this list
  {
        id: '1',
      name: 'LETSupgrade C++',
        image: '/images/certificates/LETSupgrade c++-1.png'
      },
    
  {
    id: '2',
    name: 'Full-Stack Web Development',
    image: '/images/certificates/Full-Stack Web Development Workshop Certificate_1740231643724-1.png'
  },
  {
    id: '3',
    name: 'HP Certificate',
    image: '/images/certificates/Hp certificate-1.png'
  },
  {
    id: '4',
    name: 'Infosys English Communication',
    image: '/images/certificates/Infosys English Communication -1.png'
  },
  {
    id: '5',
    name: 'Interactive Photo Album Project',
    image: '/images/certificates/Interactive Photo Album Project -geekster-1.png'
  },
  {id: '6',name: 'Java Certificate',image: '/images/certificates/JAVA LU-1.png'},
  {
    id: '7',
    name: 'HAR GAR TIRANGA',
    image: '/images/certificates/Ritesh Bonthalakoti .jpg.png'
  },
  {
    id: '8',
    name: 'C Programming',
    image: '/images/certificates/Rithesh bhai gaming Bonthla_C Programming-1.png'
  },
  {
    id: '9',
    name: 'SCALAR English',
    image: '/images/certificates/SCALAR  English-1.png'
  },
  { id: '10', name: 'AINCAT 2025', image: '/images/7.png' },
  {
    id: '11',
    name: 'CHATGPT - Earning make easy',
    image: '/images/certificates/UC-788351f6-0107-4aa6-b0a7-93cf1ab9f9c4 (1)-1.png'
  },
  {
    id: '12',
    name: 'Udemy Certificate',
    image: '/images/certificates/UC-f1921101-2f82-4fff-b648-5cd2cbc82d4b-1.png'
  },
  {
    id: '13',
    name: 'RITESH Certificate',
    image: '/images/certificates/certificate - RITESH-1.png'
  },
  {
    id: '14',
    name: 'Prompt Engineering',
    image: '/images/certificates/Prompt LU-1.png'
  },

  {
    id: '15',
    name: 'wardiere medical certificate',
    image: '/images/certificates/3.png'
  },
  {
    id: '16',
    name: 'Bootstrap Certificate',
    image: '/images/certificates/Bootstrap LU-1.png'
  },
  {
    id: '17',
    name: 'AI(Infosys)',
    image: '/images/certificates/8.png'
  },
  { id: '18', name: 'Code Clash 2K25 ', image: '/images/certificates/5.jpg' },
  {
    id: '19',
    name: 'HTML Certificate',
    image: '/images/certificates/HTML LU-1.png'
  },
  {
    id: '20',
    name: 'Low Code No Code Development Bootcamp',
    image: '/images/certificates/Low Code No Code Development Bootcamp Certificate_1740152698204-1.png'
  },
  {id: '21',name: 'AI Masterclass - Multi-Agent AI System',image: '/images/certificates/1.png'},
  {id: '22',name: 'MongoDB Certificate',image: '/images/certificates/Mongo dB LU -1.png'},
  {id: '23',name: 'Digital Marketing Certificate',image: '/images/certificates/2.png'},
  { id: '24', name: 'SMM Certificate',image: '/images/certificates/4.png' },
    { id: '25', name: 'CTF Certificate', image: '/images/certificates/6.jpg' },
    {
      id: '26',
      name: 'Figma Certificate',
      image: '/images/certificates/Figma LU-1.png'
    },
    { id: '27', name: 'IOT', image: '/images/certificates/10.png' },
    { id: '28', name: 'CyberSecurity ', image: '/images/certificates/11.png' },
    { id: '29', name: 'Entrepreneurship Certificate', image: '/images/certificates/12.png' },
    { id: '30', name: 'Python', image: '/images/certificates/14.png' },
{ id: '31', name: 'UI Path Automation', image: '/images/certificates/30.png' },






];

certificateData.reverse();

const CertificateModal = ({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) => {
  const [scale, setScale] = useState(0.8); // Start with a zoomed out view

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.5)); // Limit max zoom
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5)); // Limit min zoom
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-xl bg-black bg-opacity-50"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <button 
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-auto max-h-[90vh] flex items-center justify-center p-4">
          <div 
            className="transform transition-transform duration-200 ease-out"
            style={{ transform: `scale(${scale})` }}
          >
            <img 
              src={certificate.image} 
              alt={certificate.name} 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const { applyGlass } = useGlassMorphism();
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Update to show 10 certificates per page
  const certificatesPerPage = 10;
  const totalPages = Math.ceil(certificateData.length / certificatesPerPage);
  
  const currentCertificates = certificateData.slice(
    currentPage * certificatesPerPage, 
    (currentPage + 1) * certificatesPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Add navigation between certificates in modal
  const navigateModal = (direction: 'next' | 'prev') => {
    if (!selectedCertificate) return;
    const currentIndex = certificateData.findIndex(cert => cert.id === selectedCertificate.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % certificateData.length
      : (currentIndex - 1 + certificateData.length) % certificateData.length;
    setSelectedCertificate(certificateData[newIndex]);
  };

  return (
    <section id="certificates" className="py-20 bg-background bg-opacity-50">
        <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">My Certificates</h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            A showcase of my professional certifications and achievements
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

          {/* Certificate Cards with Animation */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {currentCertificates.map((certificate, index) => (
                <motion.div
                  key={`${currentPage}-${certificate.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => setSelectedCertificate(certificate)}
                  className="cursor-pointer"
                >
                  {applyGlass(
                    <div className="p-4 h-full flex flex-col">
                      <div className="relative overflow-hidden rounded-lg mb-4 flex-grow">
                        <img 
                          src={certificate.image} 
                          alt={certificate.name} 
                          className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                       <h3 className="text-base sm:text-sm font-medium text-center truncate">{certificate.name}</h3>
                    </div>,
                    { borderRadius: '1rem', hoverEffect: true }
                  )}
                </motion.div>
              ))}
            </motion.div>
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
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <CertificateModal 
            certificate={selectedCertificate} 
            onClose={() => setSelectedCertificate(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
