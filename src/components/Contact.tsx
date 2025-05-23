import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Copy, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xovdzygr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // You might want to show an error message to the user here
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5 text-primary" />,
      label: 'Email',
      value: 'shreyanshoct@gmail.com',
      type: 'email',
    },
    {
      icon: <MapPin className="w-5 h-5 text-success" />,
      label: 'Location',
      value: 'Raipur, CG, India',
      type: 'location',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background-light/20" ref={ref}>
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
            Get In Touch
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-gray-300 mt-4"
          >
            Have a question or want to work together? Feel free to contact me using the form below.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "exit"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-5 gap-8"
        >
          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-background-light rounded-lg p-6 accent-border"
          >
            <h3 className="text-xl font-bold mb-6 text-accent">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="flex items-start"
                >
                  <div className="mt-1">{info.icon}</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="text-white flex items-center gap-2">
                      {info.value}
                      <button
                        onClick={() => copyToClipboard(info.value, info.type)}
                        className="text-gray-400 hover:text-primary transition-colors"
                        aria-label={`Copy ${info.label}`}
                      >
                        {copied === info.type ? (
                          <CheckCircle className="w-4 h-4 text-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <h4 className="text-lg font-medium mb-4 text-white">Socials</h4>
              <div className="flex space-x-4">
                {/* LinkedIn */}
                <motion.a
                  variants={itemVariants}
                  href="https://www.linkedin.com/in/shreyansh-samaddar-a85519319/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer w-10 h-10 rounded-md flex items-center justify-center overflow-hidden transition-colors duration-300 hover:bg-[#0077B5]"
                >
                  <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current text-white">
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </motion.a>

                {/* Codeforces */}
                <motion.a
                  variants={itemVariants}
                  href="https://codeforces.com/profile/lambda_doesntexist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer w-10 h-10 rounded-md flex items-center justify-center overflow-hidden transition-colors duration-300 hover:bg-[#1F8ACB]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5V12c0-.828.673-1.5 1.5-1.5h3z" />
                  </svg>
                </motion.a>

                {/* GitHub */}
                <motion.a
                  variants={itemVariants}
                  href="https://github.com/MobsLInep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="socialContainer w-10 h-10 rounded-md flex items-center justify-center overflow-hidden transition-colors duration-300 hover:bg-[#333]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </motion.a>

                {/* Email */}
                <motion.a
                  variants={itemVariants}
                  href="mailto:shreyanshoct@gmail.com"
                  className="socialContainer w-10 h-10 rounded-md flex items-center justify-center overflow-hidden transition-colors duration-300 hover:bg-[#D44638]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-white">
                    <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 bg-background-light rounded-lg p-6 neon-border"
          >
            {formSubmitted ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <CheckCircle className="w-16 h-16 text-success mb-4" />
                <h3 className="text-xl font-bold text-success mb-2">Message Sent!</h3>
                <p className="text-gray-300 mb-6">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-primary hover:bg-primary-dark text-background px-6 py-2 rounded-md transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-background border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  ></textarea>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-background px-6 py-3 rounded-md transition-colors"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;