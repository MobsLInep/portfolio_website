import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AvatarCanvas from './three/Avatar';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      }
    }
  };

  const itemVariants = {
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

  const skills: Skill[] = [
    { name: 'Python', level: 100, category: 'languages', icon: 'PY' },
    { name: 'JS', level: 90, category: 'languages', icon: 'JS' },
    { name: 'Flutter', level: 85, category: 'Development', icon: 'FL' },
    { name: 'HTML/CSS/React', level: 80, category: 'Development', icon: 'H' },
    { name: 'Flask', level: 75, category: 'Development', icon: 'F' },
    { name: 'Git', level: 85, category: 'devops', icon: 'G' },
    { name: 'Pandas', level: 90, category: 'AI/ML', icon: 'PD' },
    { name: 'NumPy', level: 85, category: 'AI/ML', icon: 'NP' },
    { name: 'Matplotlib/Seaborn', level: 80, category: 'data', icon: 'MPL' },
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];
  const cubeRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="py-20" ref={ref}>
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
            My Skills
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            These are some of the technologies and tools I've been working with recently.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "exit"}
            variants={containerVariants}
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="mb-8"
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-accent">
                  {category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        className="skill-item"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-background flex items-center justify-center rounded-md text-primary text-sm mr-3">
                            {skill.icon}
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full"
                            style={{
                              boxShadow: "0 0 10px theme('colors.primary.DEFAULT')"
                            }}
                          ></motion.div>
                        </div>
                        <div className="mt-1 text-right text-xs text-gray-400">
                          {skill.level}%
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={inView ? "visible" : "exit"}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center"
            ref={cubeRef}
          >
            <div className="w-full h-[800px] relative"> {/* Changed from h-[400px] to h-[800px] */}
              <AvatarCanvas />
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate={inView ? "visible" : "exit"}
                transition={{ delay: 0.4 }}
                className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-400"
              >
                * Interactive 3D Avatar
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;