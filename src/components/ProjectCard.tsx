import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  codeSnippet: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Flip on hover (mouse), focus-within (keyboard), or tap (touch).
  const [flipped, setFlipped] = useState(false);

  // Keep the card flipped while focus moves between the links on its back face;
  // only flip back when focus leaves the card entirely.
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setFlipped(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="project-card"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={handleBlur}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="project-card-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <div className="project-card-front">
          <div className="h-[40%] sm:h-1/2 rounded-t-lg overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex flex-col h-[60%] sm:h-1/2">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">{project.title}</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4 flex-grow line-clamp-3 sm:line-clamp-none">{project.description}</p>
          </div>
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-center">
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-accent/20 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              <span>Flip for details</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="project-card-back">
          <h3 className="text-lg sm:text-xl font-bold text-accent mb-2">{project.title}</h3>
          <div className="bg-background/60 p-2 sm:p-3 rounded overflow-auto text-xs sm:text-sm">
            <pre className="text-terminal-green whitespace-pre-wrap">
              <code>{project.codeSnippet}</code>
            </pre>
          </div>
          <div className="flex justify-between mt-3 sm:mt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="flex items-center gap-1 text-white hover:text-primary transition-colors text-xs sm:text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} className="sm:w-4 sm:h-4" />
              <span>Source</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex items-center gap-1 text-white hover:text-primary transition-colors text-xs sm:text-sm rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-light"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Live Demo</span>
                <ExternalLink size={14} className="sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
