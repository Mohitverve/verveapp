import React, { useEffect, useRef } from 'react';
import { Card, Col, Row } from 'antd';
import 'antd/dist/reset.css';
import vrImage from "../assets/asset1.jpg";
import '../styles/service.css';

const { Meta } = Card;

const About = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const particleContainer = document.querySelector('.particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.top = `${Math.random() * 40 + 30}vh`;
      particle.style.left = `${Math.random() * 40 + 30}vw`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particleContainer.appendChild(particle);
    }

    const handleMouseMove = (e) => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(20, Math.hypot(dx, dy) / 20);
        particle.style.transform = `translate(${Math.sin(angle) * distance}px, ${Math.cos(angle) * distance}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-in-view');
        } else {
          entry.target.classList.remove('card-in-view');
        }
      });
    }, { threshold: 0.3 });

    cardRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const plans = [
    { title: "Govt Schools", duration: "Per Student", price: "₹70" },
    { title: "Private Schools", duration: "Per Student", price: "₹100" },
    { title: "Colleges", duration: "Per Student", price: "₹120" },
  ];

  return (
    <div className='Plans'>
      <div className="pricing-container">
        <div className="grid-background"></div>
        <div className="particles"></div>
        <div className="pricing-content">
          <h1 className="pricing-title">Our Pricing Plans</h1>
          <Row gutter={[16, 16]} justify="center">
            {plans.map((plan, index) => (
              <Col xs={24} sm={24} md={8} key={index}>
                <Card
                  bordered={false}
                  className="pricing-card hover-card"
                  hoverable
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <div className="card-image-container">
                    <img
                      alt={plan.title}
                      src={vrImage}
                      className="card-image hover-image"
                    />
                  </div>
                  <Meta
                    title={<div className="card-title">{plan.title}</div>}
                    description={plan.duration}
                  />
                  <div className="card-details">
                    <h2 className="card-price">{plan.price}</h2>
                    <p className="card-para">Headsets, Mobile devices and V-Book</p>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default About;
