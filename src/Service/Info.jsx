import React from 'react';
import { Card } from 'antd';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/info.css';
import vcImg from "../assets/headset.png";

const Info = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <div className="about-us-container">
      <motion.h1
        className="about-us-heading"
        style={{ opacity, y }}
      >
        What is V-Class?
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
            src={vcImg}
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
            <h2 className="about-us-subheading">V-Class</h2>
            <p>
            V-Class enables schools and institutions to book immersive learning sessions through Virtual Reality.
Students can experience subjects like history, science, commerce, and art.
Imagine being in Akbar's court, witnessing the art and culture of his rule.
Experience historical battlefields and participate in engaging quizzes.
Sessions come fully equipped with VR headsets and mobile devices for seamless delivery.
Teachers can relax and enjoy the learning process from the front row.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Info;
