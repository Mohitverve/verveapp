import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/hero.css';

const Hero = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true });
  const navigate = useNavigate(); // Initialize the navigation function

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

  // Handle button click and navigate to another page
  const handleNavigate = () => {
    navigate('/Plans'); // Adjust the route to your target page
  };

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
          Welcome to Verve
        </motion.h1>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ delay: 0.2 }}
        >
          The Future of Education
        </motion.p>

        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -50 }}
          animate={controls}
          transition={{ delay: 0.4 }}
        >
          Now experience the amazing potential of Virtual Reality in your classrooms with our V-Class.
        </motion.p>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          transition={{ delay: 0.6 }}
          className='button-container'
        >
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }} 
            onClick={handleNavigate} // Add navigation handler here
          >
          Explore  V-Class
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Hero);
