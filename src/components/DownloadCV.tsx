import { motion } from 'framer-motion';

const DownloadCV = () => {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.a
        href="/assets/my-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg shadow-primary/20"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-lg font-medium">Download CV</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </motion.a>
    </motion.div>
  );
};

export default DownloadCV;