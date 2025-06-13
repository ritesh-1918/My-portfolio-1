import React from 'react';
import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState, useRef } from 'react';

interface BlogPost {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  link: string;
  color: string;
  readTime: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  // Newest blog posts should be at the top of this list
  {
    title: '10 Best Browse Abandonment Email Expert Strategies',
    date: 'May 03, 2025',
    category: 'Email Marketing',
    excerpt: 'Learn expert strategies for crafting effective browse abandonment emails to re-engage shoppers and boost conversions.',
    image: '/blog/1.png',
    link: 'https://myb2bnetwork.com/blog/2025/05/03/10-best-browse-abandonment-email-expert-strategies/',
    color: '#61DAFB',
    readTime: '5 min read',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  {
    title: 'Instagram Caption Ideas for Marketers: Fresh Strategies for Engagement',
    date: 'May 13, 2025',
    category: 'Social Media Marketing',
    excerpt: 'Discover fresh strategies and ideas for crafting engaging Instagram captions to spark conversation, drive engagement, and build lasting relationships for your brand.',
    image: '/blog/2.png',
    link: 'https://myb2bnetwork.com/blog/2025/05/13/instagram-caption-ideas-for-marketers-fresh-strategies-for-engagement/',
    color: '#FF4154',


    readTime: '8 min read',
    tags: ['Animation', 'React', 'UI/UX']
  },

 
  {
    title: 'Transform Your Future with Programming',
    date: 'June 01, 2025',
    category: 'Programming',
    excerpt: 'This blog post explores how programming can transform your future.',
    image: '/blog/3.png',
    link: 'https://ritesh1918pythonblog1.blogspot.com/2025/06/transform-your-future-with-programming.html',
    color: '#FF5733',
    readTime: '5 min read',
    tags: ['Programming', 'Future', 'Technology']
  }
];

blogPosts.reverse();

const Blog = () => {
  const { applyGlass } = useGlassMorphism();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Blog</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on web development, design, and technology.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            {applyGlass(
              <div className="flex items-center">
                <svg className="absolute left-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border-none focus:outline-none text-white"
                />
              </div>,
              { borderRadius: '0.5rem' }
            )}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary bg-opacity-20 text-primary'
                    : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {applyGlass(
                <article className="overflow-hidden cursor-pointer" onClick={() => post.link && window.open(post.link, '_blank')}>
                  <div className="relative aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: `${post.color}22`, color: post.color }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-5"
                        >
                          {tag}
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

export default Blog;