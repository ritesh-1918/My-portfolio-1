import { motion } from 'framer-motion';
import { FaFileDownload } from 'react-icons/fa';
import { useState } from 'react';

const FloatingCVButton = () => {
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    setShowPreview(true);
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.button
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-primary bg-opacity-20 text-white hover:bg-opacity-30 transition-all duration-300 shadow-lg shadow-primary/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaFileDownload className="w-5 h-5" />
          <span className="text-lg font-medium">MY Resume</span>
        </motion.button>
      </motion.div>

      {/* CV Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <a
                href="/assets/my-cv.pdf"
                download="Ritesh-Bonthalakoti-CV.pdf"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <FaFileDownload />
                Download
              </a>
              <button
                onClick={() => setShowPreview(false)}
                className="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <iframe
              src="/assets/my-cv.pdf"
              className="w-full h-full"
              title="CV Preview"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingCVButton;