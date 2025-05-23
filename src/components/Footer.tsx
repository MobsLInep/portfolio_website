import React from 'react';
import { Code } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="md:order-2 flex flex-col items-end">
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2 items-end">
              {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:order-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="text-primary w-6 h-6" />
              <span className="text-lg font-bold text-primary text-glow">λ<span className="text-accent">ambda</span></span>
            </div>
            <p className="text-gray-400">
              Made using React, Three.js, Vite and Tailwind.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;