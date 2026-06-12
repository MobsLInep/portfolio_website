import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Patents from './components/Patents';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Heavy WebGL scene (three.js) — split into its own chunk and loaded after first paint
const BackgroundCanvas = lazy(() => import('./components/three/BackgroundCanvas'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Brief branded intro — content underneath is already ready, so keep it short
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="w-16 h-16 border-4 border-t-primary border-r-accent border-b-success border-l-terminal-yellow rounded-full"
            />
          </div>
          <p className="mt-4 text-terminal-green">
            <span className="inline-block">$ Loading</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block ml-1"
            >
              _
            </motion.span>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <BackgroundCanvas />
        </Suspense>
      </div>
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Publications />
        <Patents />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;