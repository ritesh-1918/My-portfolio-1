import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';
import { FaCode, FaTools, FaBrain } from 'react-icons/fa';
import { SiArduino, SiRaspberrypi, SiPython, SiReact, SiNodedotjs, SiTailwindcss, SiGithub, SiFigma, SiPostman } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { GiCircuitry } from 'react-icons/gi';
import { FaMicrochip } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Record<string, Skill[]>;
}

const Skills = () => {
  const { applyGlass } = useGlassMorphism();
  const [activeSection, setActiveSection] = useState('Technical');
  const [activeCategory, setActiveCategory] = useState('Software Skills');

  const skillCategories: SkillCategory[] = [
    {
      title: 'Technical',
      icon: <FaCode className="w-6 h-6" />,
      skills: {
        'Software Skills': [
          { name: 'Python', level: 85, icon: <SiPython />, color: '#3776AB' },
          { name: 'React', level: 80, icon: <SiReact />, color: '#61DAFB' },
          { name: 'Node.js', level: 78, icon: <SiNodedotjs />, color: '#339933' },
          { name: 'MongoDB', level: 70, icon: <SiNodedotjs />, color: '#47A248' },
          { name: 'Express.js', level: 70, icon: <SiNodedotjs />, color: '#000000' },
          { name: 'Machine Learning', level: 80, icon: <FaBrain />, color: '#FF6F00' },
          { name: 'Deep Learning', level:50,icon: <FaBrain />, color: '#FF6F00' },
          { name: 'Natural Language Processing', level: 70, icon: <FaBrain />, color: '#FF6F00' },
          { name: 'AI Agents', level: 65, icon: <FaBrain />, color: '#FF6F00' }
        ],
        'Hardware Skills': [
          { name: 'Arduino', level: 92, icon: <SiArduino />, color: '#00979D' },
          { name: 'Raspberry Pi', level: 88, icon: <SiRaspberrypi />, color: '#C51A4A' },
          { name: 'Circuit Design', level: 80, icon: <GiCircuitry />, color: '#FF6B6B' },
          { name: 'Verilog HDL', level: 95, icon: <FaMicrochip />, color: '#4CAF50' },
          { name: 'FPGA Programming', level: 20, icon: <FaMicrochip />, color: '#8B0000' },
          { name: 'Embedded Systems', level: 30, icon: <GiCircuitry />, color: '#4682B4' },
          { name: 'Robotics', level: 75, icon: <FaMicrochip />, color: '#A9A9A9' },
          { name: 'Sensor Integration', level: 70, icon: <GiCircuitry />, color: '#DAA520' },
          { name: 'PCB Design', level: 60, icon: <GiCircuitry />, color: '#2F4F4F' },
          { name: 'Microcontrollers', level: 90, icon: <FaMicrochip />, color: '#800080' },
          { name: 'Digital Logic', level: 95, icon: <GiCircuitry />, color: '#00CED1' },
          { name: 'Analog Circuits', level: 90, icon: <GiCircuitry />, color: '#FF8C00' },
          { name: 'ESP3266 (Node MCU)', level: 85, icon: <FaMicrochip />, color: '#483D8B' },
          { name: 'Optical Fibres', level: 70, icon: <GiCircuitry />, color: '#3CB371' },
          { name: 'IoT Devices', level: 100,icon: <GiCircuitry />, color: '#3CB371' }
        ]
      }
    },
    {
      title: 'Tools',
      icon: <FaTools className="w-6 h-6" />,
      skills: {
        'Software Tools': [
          { name: 'VS Code', level: 95, icon: <VscCode />, color: '#007ACC' },
          { name: 'Git & GitHub', level: 90, icon: <SiGithub />, color: '#181717' },
          { name: 'N8N', level: 70, icon: <FaTools />, color: '#FF6F00' }
        ],
        'Hardware Tools': [
          { name: 'TinkerCad', level: 80, icon: <FaTools />, color: '#FF6F00' },
          { name: 'Arduino IDE', level: 90, icon: <SiArduino />, color: '#00979D' },
          { name: 'ModelSim', level: 85, icon: <FaMicrochip />, color: '#4CAF50' },
          { name: 'Xilinx Vivado', level: 88, icon: <FaMicrochip />, color: '#8B0000' },
          { name: 'Raspberry Pi OS', level: 82, icon: <SiRaspberrypi />, color: '#C51A4A' }
        ]
      }
    }
  ];

  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    // Set the active category to the first available category in the new section
    const newCategory = Object.keys(skillCategories.find(cat => cat.title === newSection)?.skills || {})[0];
    setActiveCategory(newCategory);
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and professional competencies
          </p>
        </motion.div>

        {/* Main Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
          {skillCategories.map((category) => (
            <motion.button
              key={category.title}
              onClick={() => handleSectionChange(category.title)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all ${
                activeSection === category.title
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Sub-category Tabs */}
        <div className="flex flex-wrap justify-center mb-10 gap-2 sm:gap-4">
          {Object.keys(skillCategories.find(cat => cat.title === activeSection)?.skills || {}).map((subCategory) => (
            <motion.button
              key={subCategory}
              onClick={() => setActiveCategory(subCategory)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-all ${
                activeCategory === subCategory
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subCategory}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories
            .find(cat => cat.title === activeSection)
            ?.skills[activeCategory]
            ?.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {applyGlass(
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${skill.color}22` }}
                      >
                        <div className="text-2xl" style={{ color: skill.color }}>
                          {skill.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{skill.name}</h3>
                        <p className="text-sm text-gray-400">Proficiency: {skill.level}%</p>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>,
                  { borderRadius: '9999px', hoverEffect: true }
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;