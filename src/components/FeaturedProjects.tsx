import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';



interface ProjectItem {
  title: string;
  description: string;
  imageUrl: string;
  link?: string;
  technologies: string[];
  color?: string;
  id?: number;
}

const projectItems: ProjectItem[] = [
  // Newest projects should be at the top of this list
  {
    title: "CodeClash 2025 - The Battle of Algorithms",
    description: "Participated in CodeClash 2025, an algorithmic programming competition organized by Lets Code Community. Demonstrated problem-solving skills and algorithmic thinking through competitive programming challenges.",
    imageUrl: "/images/certificates/5.jpg",
    link: "https://unstop.com/certificate-preview/7891deac-510c-42e7-bebb-54b34760ca24",
    technologies: ["Algorithms", "Problem Solving", "Competitive Programming", "Data Structures"],
    color: "#4F46E5"
  },
  {
    title: "CodeFest'25 CTF Challenge",
    description: "Successfully participated in the Capture The Flag (CTF) competition at CodeFest'25, organized by the Indian Institute of Technology (Banaras Hindu University). Demonstrated skills in cybersecurity, problem-solving, and technical analysis.",
    imageUrl: "/images/certificates/6.jpg",
    link: "https://unstop.com/certificate-preview/5cb248f6-30fc-4176-b16b-09afc4a3d69f",
    technologies: ["Cybersecurity", "CTF", "Problem Solving", "Technical Analysis"],
    color: "#10B981"
  },
  {
    title: "Semrush Social Media Marketing Certification",
    description: "Completed comprehensive training in social media marketing fundamentals, including audience insights, competitor analysis, content strategy, and analytics. Earned certification from Semrush Academy, a globally recognized digital marketing education platform.",
    imageUrl: "/images/certificates/4.png",
    link: "https://static.semrush.com/academy/certificates/8fc4a3beea/ritesh-bonthalakoti_13.pdf",
    technologies: ["Social Media Strategy", "Content Planning", "Analytics", "Audience Engagement"],
    color: "#F59E0B"
  },
  {
    title: "Portfolio Website",
    description: "A modern, responsive portfolio built with React, TypeScript, and Three.js featuring interactive 3D elements and smooth animations.",
    imageUrl: "/images/projects/3D Portfolio.png",
    link: "https://ritesh1918.netlify.app/",
    technologies: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    color: "#EC4899"
  },
  // Add 2-3 more of your best projects/achievements here
  {
    title: "AINCAT 2025",
    description: "Achieved AIR 1,435 in NCAT 2025, top 0.4% among 3.6L+ participants nationwide in Engineering.",
    imageUrl: "/images/7.png",
    link: "https://www.naukri.com/campus/contests/all-india-online-aptitude-test/assessment/2025-NjgyNTBiMzE2MmNhODUxZGQyNGE4NzNj?utm_source=score_card_share",
    technologies: ["Aptitude", "Problem Solving", "Engineering"],
    color: "#3B82F6"
  },
  {
    title: "MTF Student ID Card",
    description: "Officially Gain the student ID from MTF Institute of Management, Technology and Finance by a course.",
    imageUrl: "/images/2.png",
    link: "https://gtf.pt/index.php/en/",
    technologies: ["Management ", "Finance", "Engineering"],
    color: "#3B82F4"
  }

];

projectItems.reverse();

const FeaturedProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projectItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });
  const { applyGlass } = useGlassMorphism();



  return (
    <section id="featured" className="py-20">



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Highlighting my most impactful projects and achievements
          </p>
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="relative w-full md:w-64">
              {applyGlass(
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-4 py-2 bg-transparent border-none focus:outline-none text-white"
                  />
                </div>,
                { borderRadius: '0.5rem' }
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {applyGlass(
                  <article className="overflow-hidden cursor-pointer" onClick={() => item.link && window.open(item.link, '_blank')}>
                    <div className="relative aspect-video">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{ backgroundColor: `${item.color}22`, color: item.color }}>
                          {item.technologies[0] || 'Project'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                    </div>
                  </article>,
                  { borderRadius: '1rem', hoverEffect: true }
                )}
              </motion.div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default FeaturedProjects;