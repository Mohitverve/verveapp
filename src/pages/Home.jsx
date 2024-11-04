import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const AppHeader = lazy(() => import('../components/Header'));

const Footer = lazy(() => import('../components/Footer'));
const Bookings = lazy(() => import('../components/Bookings'));


const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AppHeader />
        <Bookings/>
      </Suspense>
    </div>
  );
};

export default Home;
