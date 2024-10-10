import React from 'react';
import { Button } from 'antd';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Hero = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // 20% of the Hero section visible will trigger the animation
  });

  return (
    <div
      ref={ref}
      style={{
        background: '#121212',
        color: '#fff',
        minHeight: '100vh',
        width: '100%',
        padding: '20px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Main content */}
      <motion.div
        style={{
          maxWidth: '1200px',
          width: '100%',
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 50 }} // Start hidden and below the view
        animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
        transition={{ duration: 1, ease: 'easeOut' }} // Smooth transition
      >
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 3rem)', // Adjusted for better mobile fit
            fontWeight: '700',
            marginBottom: '20px',
            color: '#b3b3b3',
            fontFamily: 'Poppins, sans-serif',
            lineHeight: '1.2',
            whiteSpace: 'nowrap', // Ensure single line
          }}
        >
          Introducing V-Class
        </h1>
        <p
          style={{
            fontSize: 'clamp(14px, 2vw, 16px)', // Slightly reduced for better mobile fit
            marginBottom: '30px',
            maxWidth: '600px',
            opacity: 0.7,
            margin: '0 auto 30px',
          }}
        >
          V-Class, Our Virtual Reality program focused on improving learning with Virtual Reality. Now book a V-class for your classroom.
        </p>
        <Button
          type="primary"
          style={{
            background: '#3366ff',
            borderColor: '#3366ff',
            width: 'clamp(150px, 50%, 200px)',
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            transition: 'background 0.3s ease',
          }}
          aria-label="Book a V-class"
          onMouseEnter={(e) => (e.currentTarget.style.background = '#254edb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#3366ff')}
        >
          Book V-class
        </Button>
      </motion.div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Hero;
