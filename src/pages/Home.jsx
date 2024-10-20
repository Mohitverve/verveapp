import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const AppHeader = lazy(() => import('../components/Header'));
const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const OurServices = lazy(() => import('../components/OurServices'));
const Future = lazy(() => import('../components/Future'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppHeader />
        <Hero />
        <About />
        <OurServices />
        <Future />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
