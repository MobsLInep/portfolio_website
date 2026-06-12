import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, Award } from 'lucide-react';

interface Publication {
  title: string;
  venue: string;
  status: string;
  points: string[];
}

const Publications: React.FC = () => {
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

  const publications: Publication[] = [
    {
      title: 'Intelligent Cybersecurity SSH Honeypot with ML-Based Attack Recognition',
      venue: 'ARES 2026 — 21st International Conference (SecIndustry 2026 Track)',
      status: 'Accepted',
      points: [
        'Designed an SSH honeypot to capture and study real-world attacker behaviour.',
        'Built a telemetry pipeline for structured collection of attack sessions.',
        'Applied ML-based classification to recognize and categorize attack patterns.',
      ],
    },
  ];

  return (
    <section id="publications" className="py-20 bg-background-light/20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-heading text-primary">
            Publications
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            Peer-reviewed research at the intersection of cybersecurity and machine learning.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="max-w-3xl mx-auto space-y-6"
        >
          {publications.map((pub) => (
            <motion.div
              key={pub.title}
              variants={itemVariants}
              className="bg-background-light rounded-lg p-6 accent-border"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center border border-accent/50">
                  <FileText className="text-accent w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{pub.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{pub.venue}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-success bg-success/10 px-2 py-1 rounded mt-2">
                    <Award className="w-4 h-4" />
                    {pub.status}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {pub.points.map((point, index) => (
                  <li key={index} className="flex gap-2 text-gray-300 text-sm">
                    <span className="text-terminal-green flex-shrink-0">&gt;</span>
                    <span>{point}</span>
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

export default Publications;
