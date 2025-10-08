'use client';

import StarField from '@/components/StarField';
import WaveBackground from '@/components/WaveBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background Layers */}
      <WaveBackground />
      <StarField />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Sections */}
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      
      {/* Chatbot Widget */}
      <ChatBot />
    </main>
  );
}