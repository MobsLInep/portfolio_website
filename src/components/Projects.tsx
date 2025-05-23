import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

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

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: "afterChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Discord Bots",
      description: "Developed Discord bots for music playback and moderation using Discord.py and Discord.js, integrating YouTube API for seamless user experience.",
      imageUrl: "images/proj1.jpg",
      tags: ["API", "Discord.py", "Discord.js"],
      githubUrl: "https://github.com/MobsLInep/harmoni2",
      codeSnippet: `>Discord.py (Python)
>Discord.js (JavaScript)
>YouTube API integration
>Music playback features
>Moderation commands`
    },
    {
      id: 2,
      title: "CSV Analyzer",
      description: "Built a CSV data analyzer web tool using Python and Pandas to visualize correlations, clean data, and generate heatmaps for quick data insights.",
      imageUrl: "images/proj2.jpg",
      tags: ["ML", "Pandas", "Image Processing"],
      githubUrl: "https://github.com/MobsLInep/CSV_data_analytics_website",
      codeSnippet: `>Python & Pandas
>Correlation heatmaps
>Data cleaning functions
>Matplotlib/Seaborn visuals`
    },
    {
      id: 3,
      title: "IOT-Based Air Quality System",
      description: "Designed an IoT-based air Quality monitoring system with real-time data logging, blockchain integration, and simulated quantum encryption for secure environmental data transmission.",
      imageUrl: "images/proj3.jpg",
      tags: ["IOT", "Blockchain", "Quantum Computing"],
      githubUrl: "https://github.com/MobsLInep/Air_Pollution_Monitoring_System",
      codeSnippet: `>IoT sensors (Air Quality)
>Quantum encryption (simulated)
>Blockchain data logging
>Raspberry Pi
>Real-time monitoring system
>AI-powered analysis`
    },
    {
      id: 4,
      title: "Letter Recognition using CNN",
      description: "Built a web-based alphabet recognizer using a CNN trained on a Kaggle dataset, with image preprocessing, decompression, and real-time prediction through a clean interface.",
      imageUrl: "images/proj4.jpg",
      tags: ["ML", "CNN", "Web Development"],
      githubUrl: "https://github.com/MobsLInep/Letter_Recognition_using_CNN",
      codeSnippet: `>CNN (Keras/TensorFlow)
>Kaggle alphabet dataset
>Image preprocessing & decoding
>Image decompression module
>Web-based UI`
    },
    {
      id: 5,
      title: "Spotify UI Clone",
      description: "Built a responsive Spotify UI clone using Flutter and Dart, featuring custom widgets, smooth navigation, and mock media controls for design and frontend development practice.",
      imageUrl: "images/proj5.jpg",
      tags: ["Flutter", "Dart", "App Development"],
      githubUrl: "https://github.com/MobsLInep/Spotify_ui_clone",
      codeSnippet: `>Flutter & Dart
>Spotify-inspired UI
>Custom widgets & layouts
>Mock media controls
>Responsive design`
    },
    {
      id: 6,
      title: "Hand-Controlled 3D Ellipse Visualizer",
      description: "Created a hand-controlled 3D ellipse visualizer using MediaPipe and PyOpenGL, where real-time gestures control shape, rotation, and scale through UDP-based communication.",
      imageUrl: "images/proj6.jpg",
      tags: ["Sockets", "Mediapipe", "OpenGL"],
      githubUrl: "https://github.com/MobsLInep/3d-Ellipse-visualisation-using-hand-gestures",
      codeSnippet: `>MediaPipe hand tracking
>PyOpenGL + Pygame
>Real-time UDP sockets
>Dynamic 3D visualization
>Gesture-based interaction`
    },
  ];

  const filters = ['all', 'React', 'ML', 'App Development', 'API'];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.tags.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-background-light/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "exit"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="section-heading text-primary"
          >
            My Projects
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            Here are some of my recent projects that showcase my skills and interests in different technologies.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mt-8"
          >
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-primary text-background font-medium' 
                    : 'bg-background-light text-white hover:bg-primary/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "exit"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id} 
              variants={itemVariants}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? "visible" : "exit"}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/MobsLInep?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-colors duration-300"
          >
            <Github size={20} />
            <span>View More Projects on GitHub</span>
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;