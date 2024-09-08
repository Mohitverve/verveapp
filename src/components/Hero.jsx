import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card } from 'antd';
import { useInView } from 'react-intersection-observer';
import '../styles/hero.css';
import heroImage from '../assets/vr.png'; // Ensure the correct image path
import Header from './Header';

const Hero = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: cardRef, inView: cardInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: false,
    threshold: 0.1, // When Hero component is in view, we set it to true
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    if (heroInView) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heroInView]); // Only add/remove the mousemove listener when the Hero component is in view

  return (
    <div>
      <Header />
      <div ref={heroRef} className="hero-container">
        <Row gutter={16} align="middle">
          <Col xs={24} md={12}>
            <div
              ref={imageRef}
              className={`interactive-image ${imageInView ? 'fadeInLeft' : 'initial'}`}
            >
              <img src={heroImage} alt="VR Education" className={`hero-image ${imageInView ? 'slideIn' : 'initial'}`} />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Card
              ref={cardRef}
              className={`hero-content-card ${cardInView ? 'fadeInRight' : 'initial'}`}
              hoverable
            >
              <h1 className="hero-title">Welcome to Verve</h1>
              <p className="hero-description">
                Redefining the educational landscape through Virtual Reality, offering immersive learning experiences for students and revolutionizing how tests are conducted.
              </p>
              <Button type="primary" size="large" className="cta-button">
                Learn More
              </Button>
            </Card>
          </Col>
        </Row>
        {heroInView && ( // Only render the color spot when Hero is in view
          <div
            className="color-spot"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
            }}
          ></div>
        )}
      </div>
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
        }
        .color-spot {
          position: fixed;
          width: 1000px;
          height: 1000px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(24, 144, 255, 0.2) 0%, rgba(24, 144, 255, 0) 70%);
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
          transition: left 0.1s ease-out, top 0.1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;
