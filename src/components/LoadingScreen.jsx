// src/components/LoadingScreen.js
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/LoadingScreen.css'; // Import the updated CSS

const LoadingScreen = ({ onFinish }) => {
  return (
    <div className="loading-screen">
      <TypeAnimation
        sequence={['Transforming Education...', 1000]} // Typing text
        speed={50}
        wrapper="h1"
        cursor={true}
        repeat={1} // Once it's typed, it finishes
        onFinished={() => setTimeout(onFinish, 1000)} // Wait for 1 second after finishing before calling onFinish
      />
    </div>
  );
};

export default LoadingScreen;
