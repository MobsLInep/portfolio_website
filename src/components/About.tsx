import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
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
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
      },
    },
  };

  const TimelineItem = ({ icon, title, place, year, description }: { 
    icon: React.ReactNode;
    title: string;
    place: string;
    year: string;
    description: string;
  }) => (
    <motion.div 
      variants={itemVariants}
      className="flex gap-4 mb-8"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-12 h-12 rounded-full bg-background-light flex items-center justify-center border border-primary/50">
          {icon}
        </div>
        <div className="h-full w-0.5 bg-primary/30 mx-auto mt-2"></div>
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">{year}</span>
        </div>
        <p className="text-gray-400 text-sm mt-1">{place}</p>
        <p className="mt-2 text-gray-300">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <section id="about" className="py-20">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid md:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <h2 className="section-heading text-primary">About Me</h2>
            <div className="space-y-4 mt-8">
              <p className="text-gray-300">
              My name is Shreyansh Samaddar, and I'm pursuing B.Tech in Data Science and Artificial Intelligence at IIIT Naya Raipur. I take pleasure in creating smart systems and addressing real-world challenges through coding and creativity.
              </p>
              <p className="text-gray-300">
              I've engaged in projects related to machine learning, IoT, web development, and automation—spanning from flight reservation systems to CSV analysis tools and AI-driven digit identification.
              </p>
              <p className="text-gray-300">
              Beyond academics, I am active in my college tech club, tutor in 3D modeling, and investigate emerging technologies. I am presently looking for internships to gain knowledge, work together, exhibit professionalism, and evolve as a developer.
              </p>
              <div className="pt-4">
                <a 
                  href="#contact"
                  className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md transition-colors duration-300 inline-block"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="mt-4 md:mt-0">
            <h3 className="text-xl font-bold mb-6 text-white">My Journey</h3>
            <div className="relative">
              <TimelineItem
                icon={<GraduationCap className="text-primary" />}
                title="Secondary Education"
                place="St. Xavier's School, Raipur(ICSE)"
                year="2011-2021"
                description="Choose Science + Computer Stream in 10th(ICSE) scoring 94.4%. Languages learned during this period were Java(as per our courseplan), C++ and HTML."
              />
              <TimelineItem
                icon={<GraduationCap className="text-success" />}
                title="Higher Secondary Education"
                place="Krishna Public School, Dunda, Raipur(CBSE)"
                year="2021-2023"
                description="Choose PCM + Computer Science in 12th(CBSE) scoring 86.4%. Languages learned during this period were Python(as per our courseplan) and JavaScript."
              />
              <TimelineItem
                icon={<Code2 className="text-accent" />}
                title="College Education"
                place="Dr. Shyama Prasad Mukherjee International Institute of Information Technology, Naya Raipur"
                year="2024 - Present"
                description="Currently pursuing B.Tech in Data Science and Artificial Intelligence with 9.29 CGPA."
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
//clerish, successfully accomplished