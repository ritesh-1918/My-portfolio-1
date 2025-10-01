import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-background bg-opacity-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Exploring the intersection of hardware and software to build innovative solutions.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left side - Photo with animated frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-2/5 relative"
          >
            {/* Changed from aspect-square to custom 9:16 aspect ratio with larger size */}
            <div className="w-full mx-auto relative max-w-xs sm:max-w-sm md:max-w-md" style={{ aspectRatio: '9/16' }}>
              {/* Decorative frame */}
              <motion.div 
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary to-secondary opacity-10"
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              {/* Photo container with gradient border */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-primary to-secondary">
                <div className="w-full h-full rounded-xl overflow-hidden bg-background">
                  {/* Replace this with your actual photo */}
                  <img 
                    src="/images/Ritesh pic.png" 
                    alt="Ritesh Bonthalakoti"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary bg-opacity-5 border border-primary border-opacity-20"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <motion.div 
                className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-secondary bg-opacity-5 border border-secondary border-opacity-20"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
            </div>
          </motion.div>
          
          {/* Right side - Content with cards */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:w-3/5"
          >
            <div className="space-y-8">
              {/* Journey card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10 hover:border-primary hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">My Self</h3>
                    <p className="text-gray-300">
                      As a 17 year old Entrepreneur from Visakhapatnam Aiming to slove real world problems using both hardware technologies and software. I'm pursing my Diploma 3rd year in Electronics and Communication Engineering at Sanketika Polytechnic College.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Approach card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10 hover:border-primary hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">My Approach</h3>
                    <p className="text-gray-300">
                      I break complex problems into smaller modules, prototype each piece, and iterate rapidly. My approach combines hardware finesse with software agility, ensuring end-to-end reliability and user-centered design. I've evolved from focusing on individual components to holistic system design—anticipating user interaction, data flows, and real-world constraints.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Vision card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-5 rounded-xl p-6 border border-white border-opacity-10 hover:border-primary hover:border-opacity-30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary bg-opacity-20 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">My Vision</h3>
                    <p className="text-gray-300">
                      I envision myself as an Entreprenur , leading projects that merge sensor networks with AI analytics. I'm passionate about creating smart-environment solutions, wearable health monitors, and AI-powered analytics platforms. By delivering reliable, accessible IoT solutions, I hope to empower communities and enable data-driven decisions at scale.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Projects & Skills section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-10 hover:border-primary hover:border-opacity-30 transition-colors">
                    <h4 className="text-lg sm:text-xl font-bold mb-3 gradient-text">Notable Projects</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>RaceXplorer: Real-time race-tracking IoT system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Futurstic IoT Home Automation using ESP3266 </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Custom AI agents built from scratch</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-10 hover:border-primary hover:border-opacity-30 transition-colors">
                    <h4 className="text-lg sm:text-xl font-bold mb-3 gradient-text">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">Arduino IDE</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">Python</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">AI Agents</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">Verilog HDL</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">IoT Technologies</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">OpenCV</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">Video Editing</span>
                      <span className="px-3 py-1 bg-primary bg-opacity-10 text-primary rounded-full text-sm hover:bg-primary hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">Vibe Coding</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
