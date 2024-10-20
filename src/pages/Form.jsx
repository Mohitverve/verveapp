import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const BookingForm = lazy(() => import('../components/BookingForm'));
const AppHeader = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));
// If you need to use Contact, you can import it dynamically as well
// const Contact = lazy(() => import('../components/Contact'));

const Form = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppHeader />
      </Suspense>
      
      <Suspense fallback={<div>Loading Booking Form...</div>}>
        <BookingForm />
      </Suspense>

      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Form;
