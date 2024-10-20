import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/LoadingScreen.css'; // Import the updated CSS
import logo from '../assets/vervelogo.png'; // Make sure to add your logo path here

const LoadingScreen = ({ onFinish }) => {
  return (
    <div className="loading-screen">
      {/* Animated logo */}
      <img src={logo} alt="Logo" className="animated-logo" />
      {/* Optional text animation */}
      <TypeAnimation
        sequence={['Transforming Education...', 1000]} // Typing text
        speed={50}
        wrapper="h1"
        cursor={true}
        repeat={1} // Once it's typed, it finishes
        onFinished={() => {
          // Wait for 2 seconds after finishing before calling onFinish
          setTimeout(onFinish, 3000); // Adjust this duration as needed
        }} 
      />
    </div>
  );
};

export default React.memo(LoadingScreen);
