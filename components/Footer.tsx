'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/m-hunzala', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/hunzala-zafar', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/__hunzala', label: 'Twitter' },
  ];

  return (
    <footer className="relative py-16 bg-gray-900/20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-white"
          >
            M.Hunzala
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex space-x-6"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-gray-800/50 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-500/50 rounded-full text-gray-400 hover:text-blue-400 transition-all duration-300"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <p className="text-gray-400">
              © {new Date().getFullYear()} M.Hunzala. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Crafted with passion and powered by innovation
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}