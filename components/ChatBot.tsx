'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Brain } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message when chat opens for the first time
      const welcomeMessage: Message = {
        id: '1',
        text: "👋 Hi, I'm Hunzala's AI Assistant. Ask me anything about his skills, projects, or how to contact him!",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Skills-related responses
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return "Hunzala specializes in:\n\n🔹 Frontend: React, Next.js, TypeScript, Tailwind CSS\n🔹 Backend: Python, FastAPI, APIs\n🔹 AI: OpenAI, LangGraph, CrewAI, n8n\n🔹 Design: Figma, Photoshop, Illustrator\n\nHe's passionate about creating intelligent digital experiences!";
    }
    
    // Projects-related responses
    if (message.includes('project') || message.includes('work') || message.includes('portfolio')) {
      return "Hunzala has worked on exciting projects including:\n\n🚀 AI-powered web applications\n💼 E-commerce platforms\n🎨 Brand identity systems\n⚡ Automation workflows\n\nEach project showcases his expertise in modern web development, AI integration, and design. Check out the Projects section for more details!";
    }
    
    // Contact-related responses
    if (message.includes('contact') || message.includes('hire') || message.includes('email') || message.includes('reach')) {
      return "Ready to work together? You can reach Hunzala through:\n\n📧 Email: hello@hunzala.dev\n📱 Phone: +1 (555) 123-4567\n🌍 Available worldwide for remote work\n\nFeel free to use the contact form on this website or reach out directly!";
    }
    
    // Experience-related responses
    if (message.includes('experience') || message.includes('background') || message.includes('about')) {
      return "Hunzala is a passionate developer and designer who loves creating innovative digital experiences. With expertise spanning:\n\n✨ Full-stack web development\n🤖 Artificial intelligence engineering\n🎨 Professional graphic design\n\nHe brings ideas to life through clean code and stunning visuals, always pushing boundaries with cutting-edge technologies.";
    }
    
    // AI-related responses
    if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning')) {
      return "Hunzala is skilled in AI engineering using:\n\n🧠 OpenAI API integration\n🔗 LangGraph for complex workflows\n👥 CrewAI for multi-agent systems\n🔄 n8n for automation\n\nHe develops intelligent systems that solve real-world problems and enhance user experiences.";
    }
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn more about Hunzala's work and expertise. What would you like to know about his skills, projects, or experience?";
    }
    
    // Default response
    return "I'd be happy to help! You can ask me about:\n\n🔹 Hunzala's technical skills\n🔹 His projects and portfolio\n🔹 How to contact him\n🔹 His experience and background\n\nWhat interests you most?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600/20 border-red-500/30 text-red-400' 
            : 'bg-blue-600/20 border-blue-500/30 text-blue-400'
        } border backdrop-blur-sm hover:scale-110`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Brain className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-96 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700/50 bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Brain className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-gray-400 text-sm">Ask me about Hunzala</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 h-64 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-800/50 text-gray-200 rounded-bl-md'
                        : 'bg-blue-600/20 text-white rounded-br-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {message.text}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-800/50 p-3 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/30 hover:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}