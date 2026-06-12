import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase } from 'lucide-react';

interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

const Experience: React.FC = () => {
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
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        when: 'afterChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      y: 20,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' },
    },
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeIn' },
    },
  };

  const experiences: ExperienceEntry[] = [
    {
      role: 'Cybersecurity AI/ML Research Intern',
      company: 'SwiftSafe',
      period: 'Mar 2026 – May 2026',
      bullets: [
        'Built AI-agent orchestration pipelines (RAG → LLM → Tooling) with dynamic, context-aware tool selection.',
        'Integrated browser automation, malware analysis, and reverse-engineering tooling into the agent workflow.',
        'Coordinated cross-team pipelines to ship reliable, end-to-end security research automation.',
      ],
    },
    {
      role: 'Business Analysis & Data Analytics Intern',
      company: 'Piramal Swasthya',
      period: 'Jun 2025 – Jul 2025',
      bullets: [
        'Developed a RAG-based AI system using FastAPI, Apache Superset, and vector retrieval.',
        'Enabled natural-language → dashboard conversion for non-technical stakeholders.',
        'Turned raw operational data into actionable analytics for decision-making.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-heading text-primary">
            Experience
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            Internships where I've built AI systems and shipped real-world tooling.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              variants={itemVariants}
              className="bg-background-light rounded-lg p-6 neon-border"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center border border-primary/50">
                  <Briefcase className="text-primary w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-accent font-medium">{exp.company}</p>
                  <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded inline-block mt-2">
                    {exp.period}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-2 text-gray-300 text-sm">
                    <span className="text-terminal-green flex-shrink-0">&gt;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
