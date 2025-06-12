import { useState } from 'react';
import { motion } from 'framer-motion';

interface BackgroundToggleProps {
  onToggle: (type: 'default' | 'ai' | 'dynamic') => void;
  currentType: 'default' | 'ai' | 'dynamic';
}

const BackgroundToggle: React.FC<BackgroundToggleProps> = ({ onToggle, currentType }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors"
          aria-label="Toggle background options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        </button>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-16 right-0 bg-black bg-opacity-80 backdrop-blur-md rounded-lg p-3 shadow-xl"
        >
          <div className="flex flex-col space-y-2 min-w-[150px]">
            <button
              onClick={() => {
                onToggle('default');
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded text-sm text-left transition-colors ${
                currentType === 'default'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              Space Theme
            </button>
            <button
              onClick={() => {
                onToggle('ai');
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded text-sm text-left transition-colors ${
                currentType === 'ai'
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-white hover:bg-opacity-10'
              }`}
            >
              AI Gradient
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundToggle;