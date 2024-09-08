import React, { useEffect, useRef, useState } from "react";
import "../styles/future.css";

const Future = () => {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer to track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const element = sectionRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const viewportHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate progress based on how much the component has been scrolled into view
      const totalHeightScrolled = scrollTop + viewportHeight - elementTop;
      const totalScrollableHeight = viewportHeight + elementHeight;

      const scrollProgress = Math.max(
        0,
        Math.min(1, totalHeightScrolled / totalScrollableHeight)
      );
      setProgress(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="vr-container" ref={sectionRef}>
      {/* Vertical Progress Bar */}
      <div
        className="progress-bar-vertical"
        style={{ height: `${progress * 100}%` }}
      ></div>

      {/* VR Content */}
      <div className="vr-content">
        <h1>
          VR is the Future <br />
          of Education
        </h1>
        <p>
          Whether you’re learning how to code or exploring immersive learning,
          VR opens doors to new educational experiences. Join the global
          movement towards a more interactive future in education.
        </p>
        <div className="vr-buttons">
          <button className="vr-signup">Sign up for VR</button>
        </div>
      </div>
    </div>
  );
};

export default Future;
