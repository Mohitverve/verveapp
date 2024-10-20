import React, { Suspense, lazy } from 'react';

// Dynamically import the components
const AppHeader = lazy(() => import('../components/Header'));
const DeliveryPartners = lazy(() => import('../components/DeliveryPartners'));

const Request = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <AppHeader />
      </Suspense>
      <Suspense fallback={<div>Loading Delivery Partners...</div>}>
        <DeliveryPartners />
      </Suspense>
    </div>
  );
};

export default Request;
