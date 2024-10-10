import React, { useEffect, useRef } from 'react';
import '../styles/benefits.css';

const Benefits = () => {
  const benefitsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const benefitItems = benefitsRef.current.querySelectorAll('.benefit-item');
    benefitItems.forEach((item) => observer.observe(item));

    return () => {
      benefitItems.forEach((item) => observer.unobserve(item));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="benefits-container" ref={benefitsRef}>
      <h2 className="benefits-heading">Benefits of Using VR for Learning</h2>
      <div className="benefits-list">
        <div className="benefit-item">
          <h3>Immersive Learning</h3>
          <p>VR provides an immersive experience that allows students to interact with their learning environment in ways that traditional methods cannot.</p>
        </div>
        <div className="benefit-item">
          <h3>Increased Engagement</h3>
          <p>Students are more engaged with the content, leading to better retention and interest in subjects that may have previously seemed uninteresting.</p>
        </div>
        <div className="benefit-item">
          <h3>Safe Simulation</h3>
          <p>VR allows for the simulation of dangerous or impractical situations, offering students a safe environment to explore, experiment, and learn.</p>
        </div>
        <div className="benefit-item">
          <h3>Enhanced Collaboration</h3>
          <p>Students can collaborate in virtual environments, breaking geographical barriers and fostering teamwork in a global context.</p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
