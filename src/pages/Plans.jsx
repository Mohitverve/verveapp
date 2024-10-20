import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const AppHeader = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));
const Hero = lazy(() => import('../Service/Hero'));
const About = lazy(() => import('../Service/About'));
const Benefits = lazy(() => import('../Service/Benefits'));
const Info = lazy(() => import('../Service/Info'));

const Plans = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppHeader />
      </Suspense>
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading Info...</div>}>
        <Info />
      </Suspense>
      <Suspense fallback={<div>Loading Benefits...</div>}>
        <Benefits />
      </Suspense>
      <Suspense fallback={<div>Loading About...</div>}>
        <About />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Plans;
