    import React, { useEffect, useRef, useState } from "react";
    import "../styles/future.css";

    const Future = () => {
      const [progress, setProgress] = useState(0);
      const sectionRef = useRef(null);
      const progressBarRef = useRef(null);

      useEffect(() => {
        const sectionElement = sectionRef.current;
        const progressBarElement = progressBarRef.current;
        
        if (!sectionElement || !progressBarElement) return;

        const observerOptions = {
          root: null,
          rootMargin: "0px",
          threshold: new Array(101).fill(0).map((_, i) => i / 100)
        };

        const handleIntersect = (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            // Calculate progress based on how much of the element is in view
            const viewportHeight = window.innerHeight;
            const elementTop = entry.boundingClientRect.top;
            const elementHeight = entry.boundingClientRect.height;
            const visibleHeight = Math.min(viewportHeight, elementTop + elementHeight) - Math.max(0, elementTop);
            const progressRatio = visibleHeight / elementHeight;
            
            setProgress(progressRatio);
            console.log("Progress Ratio:", progressRatio); // Debugging line
          } else {
            // Reset progress when element is out of view
            setProgress(0);
          }
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        observer.observe(sectionElement);

        return () => observer.disconnect();
      }, []);

      return (
        <div className="vr-container" ref={sectionRef}>
          {/* Vertical Progress Bar */}
          <div className="progress-bar-container" ref={progressBarRef}>
            <div 
              className="progress-bar-vertical"
              style={{ height: `${progress * 100}%` }}
            ></div>
          </div>

          {/* VR Content */}
          <div className="vr-content">
            <h1 className="future-head">
              VR is the Future <br />
              of Education
            </h1>
            <p>
              At Verve, Education is re-imagined with the help of Virtual Reality. Now welcome the most effective way of learning, take VR tests in your classroom and advance to the next stage of education.
            </p>
            <div className="vr-buttons">
              <button className="vr-signup">Buy V-Book</button>
              <div className="VR-Book">
              <p className="soon">"Introducing soon"</p>
              </div>
            
            </div>
          </div>
        </div>
      );
    };

    export default React.memo(Future);
