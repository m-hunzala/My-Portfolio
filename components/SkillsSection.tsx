'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export default function SkillsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 92 },
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'TypeScript', level: 85 },
      ],
    },
    {
      title: 'Backend & AI',
      skills: [
        { name: 'Python', level: 92 },
        { name: 'Fast APIs', level: 88 },
        { name: 'Ai Frameworks', level: 85 },
        { name: 'Ai Integration', level: 80 },
        { name: 'Deployment', level: 88 },
      ],
    },
    {
      title: 'Design',
      skills: [
        { name: 'Figma', level: 92 },
        { name: 'Photoshop', level: 88 },
        { name: 'Illustrator', level: 85 },
        { name: 'UI/UX Design', level: 90 },
        {name: 'Canva', level:95},
      ],
    },
  ];

  return (
    <section id="skills" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="p-8 rounded-2xl bg-gray-800/30 border border-gray-700/50"
            >
              <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ skill, delay, inView }: { 
  skill: { name: string; level: number }; 
  delay: number; 
  inView: boolean;
}) {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.level, delay]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium group-hover:text-blue-400 transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-blue-400 text-sm font-semibold">
          {animatedLevel}%
        </span>
      </div>
      
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${animatedLevel}%` : 0 }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}