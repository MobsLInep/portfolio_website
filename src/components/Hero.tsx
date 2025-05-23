import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-terminal-green mb-4"
          >
            <div className="neon-border rounded-lg p-6 text-xl inline-block">
              <span className="opacity-70">&gt;</span> Hello, World! I am
            </div>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 relative">
            <span className="text-primary text-glow">Shreyansh</span>{' '}
            <span className="text-accent text-glow">Samaddar</span>
          </h1>
          
          <div className="text-xl md:text-2xl lg:text-3xl mb-8 h-12">
            <TypeAnimation
              sequence={[
                '> Full Stack Developer',
                2000,
                '> App Developer',
                2000,
                '> AI/ML Engineer',
                2000,
                '> Data Science Enthusiast',
                2000,
              ]}
              wrapper="div"
              cursor={true}
              repeat={Infinity}
              className="text-terminal-green inline-block"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 mb-12 md:mb-16"
          >
            <a
              href="#projects"
              className="bg-transparent hover:bg-primary/10 text-primary border-2 border-primary px-6 py-3 rounded-md transition-all duration-300 inline-block relative overflow-hidden group"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex justify-center space-x-6 mb-16"
          >
            {[
              { icon: <Github size={24} />, href: 'https://github.com/MobsLInep', label: 'GitHub' },
              { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/shreyansh-samaddar-a85519319/', label: 'LinkedIn' },
              { icon: <Mail size={24} />, href: 'mailto:shreyanshoct@gmail.com', label: 'Email' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <a href="#about" aria-label="Scroll down">
            <ChevronDown className="w-8 h-8 text-primary" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;