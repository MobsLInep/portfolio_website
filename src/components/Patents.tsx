import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ScrollText, BadgeCheck } from 'lucide-react';

interface Patent {
  number: string;
  title: string;
  granted: string;
  role: string;
  summary: string;
}

const Patents: React.FC = () => {
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

  const patents: Patent[] = [
    {
      number: 'Indian Patent No. 589285',
      title: 'Monitoring Air Pollution through Quantum Secured Encryption in IoT and Blockchain',
      granted: 'Granted 13 May 2026',
      role: 'Co-Inventor',
      summary:
        'Blockchain combined with quantum-secured encryption for real-time, tamper-resistant environmental monitoring.',
    },
  ];

  return (
    <section id="patents" className="py-20" ref={ref}>
      <div className="section-container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="section-heading text-primary">
            Patents
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            Granted intellectual property from my research work.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'exit'}
          variants={containerVariants}
          className="max-w-3xl mx-auto space-y-6"
        >
          {patents.map((patent) => (
            <motion.div
              key={patent.number}
              variants={itemVariants}
              className="bg-background-light rounded-lg p-6 success-border"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center border border-success/50">
                  <ScrollText className="text-success w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded font-medium">
                      {patent.number}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-success bg-success/10 px-2 py-1 rounded">
                      <BadgeCheck className="w-4 h-4" />
                      {patent.granted}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2">{patent.title}</h3>
                  <p className="text-accent text-sm mt-1">{patent.role}</p>
                  <p className="text-gray-300 text-sm mt-3">{patent.summary}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Patents;
