import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../Service/hero.css';

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });

  // Trigger animation when in view
  React.useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: 'easeOut' },
      });
    }
  }, [inView, controls]);

  return (
    <div className='hero'>
      <div className='meteor-container'>
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className='meteor'></div>
        ))}
      </div>

      <div className='hero-content'>
        <motion.h1
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
        >
           V-Class
        </motion.h1>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          The Future of Learning
        </motion.p>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          V-Class, Our Virtual Reality program focused on improving learning with Virtual Reality


        </motion.p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className='button-container'
        >
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Book a V-Class
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
