import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const AppHeader = lazy(() => import('../components/Header'));
const Hero = lazy(() => import('../V-class/Hero'));
const Vclass = lazy(() => import('../V-class/Vclass'));
const Footer = lazy(() => import('../components/Footer'));

const VClass = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppHeader />
      </Suspense>
      <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
      </Suspense>
      <Suspense fallback={<div>Loading V-Class...</div>}>
        <Vclass />
      </Suspense>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default VClass;
