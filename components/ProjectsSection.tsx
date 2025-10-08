'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects = [
    {
      title: 'AI-Powered Web Application',
      description: 'A full-stack application leveraging OpenAI and LangGraph for intelligent content generation with a modern React frontend.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['React', 'Python', 'FastAPI', 'OpenAI', 'Tailwind'],
      github: 'https://github.com/m-hunzala',
      demo: '#',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Database'],
      github: 'https://github.com/m-hunzala',
      demo: 'https://digistore-murex.vercel.app/',
    },
    {
      title: 'Brand Identity System',
      description: 'Complete brand identity design including logo, typography, color palette, and marketing materials for a tech startup.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['Figma', 'Illustrator', 'Photoshop', 'Brand Design'],
      github: 'https://github.com/m-hunzala',
      demo: '#',
    },
    {
      title: 'Automation Workflow',
      description: 'n8n-powered automation system integrating multiple APIs for streamlined business processes and data synchronization.',
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
      tags: ['n8n', 'Python', 'REST APIs', 'Webhooks'],
      github: 'https://github.com/m-hunzala',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-32 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work spanning web development, AI integration, and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-blue-400 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:text-blue-400 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-blue-600/20 text-blue-400 rounded-full border border-blue-600/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}