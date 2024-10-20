import React from 'react';
import { Card } from 'antd';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/about.css';
import aboutImage from "../assets/vr.png";

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div className="about-us-container">
      <motion.h1
        className="about-us-heading"
        style={{ opacity, y }}
      >
        About Us
      </motion.h1>
      <div className="aurora-background"></div>

      <div className="about-us-content">
        <motion.div
          className="about-us-image-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={aboutImage}
            alt="VR Headset"
            className="about-us-image-animation"
          />
        </motion.div>

        <motion.div
          className="about-us-text-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card bordered={false} className="card-container">
            <h2 className="about-us-subheading">Welcome to Verve</h2>
            <p>
              Verve is an edtech platform dedicated towards making learning more
              effective with the help of Virtual Reality. Schools and other
              institutions can book a V-Class for an immersive learning experience, At Verve our goal is aid our exisiting learning frameworks and make it an easy task for students and teachers alike.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(AboutUs);
