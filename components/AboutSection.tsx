'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Brain, Palette, Rocket } from 'lucide-react';

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building scalable web applications with modern technologies and best practices.',
    },
    {
      icon: Brain,
      title: 'AI Engineering',
      description: 'Developing intelligent systems using machine learning and advanced AI frameworks.',
    },
    {
      icon: Palette,
      title: 'Design Excellence',
      description: 'Creating stunning visual experiences with professional design tools and principles.',
    },
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technologies and creative solutions.',
    },
  ];

  return (
    <section id="about" className="py-32 bg-gray-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate developer and designer who loves creating innovative digital experiences. 
            With expertise spanning web development, artificial intelligence, and graphic design, 
            I bring ideas to life through clean code and stunning visuals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gray-800/30 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <feature.icon className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}