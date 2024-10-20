import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';  // Import your CSS file
import LoadingScreen from './components/LoadingScreen';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './components/firebase';

// Dynamically import the components
const Home = lazy(() => import('./pages/Home'));
const Register = lazy(() => import('./components/Register'));
const Plans = lazy(() => import('./pages/Plans'));
const VClass = lazy(() => import('./pages/VClass'));
const Form = lazy(() => import('./pages/Form'));
const Request = lazy(() => import('./pages/Request'));
const Admin = lazy(() => import('./Admin/Admin'));
const Employee = lazy(() => import('./pages/Emlployee'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);  // null: still determining, false: not authenticated, true: authenticated
  const [isAdmin, setIsAdmin] = useState(false);  // State to track if the user is an admin
  const [isEmployee, setIsEmployee] = useState(false); // State to track if the user is an employee
  const [isLoading, setIsLoading] = useState(true); // Loading state for checking auth status
  const [fadeOut, setFadeOut] = useState(false); // Loading screen fade effect

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);

        // Check for admin and employee roles
        const idTokenResult = await user.getIdTokenResult();
        setIsAdmin(!!idTokenResult.claims.admin); // User is an admin
        setIsEmployee(!!idTokenResult.claims.employee); // User is an employee
      } else {
        setIsAuthenticated(false);
      }

      // End the loading state after auth is checked
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fade out loading screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // Extra time for fade-out effect
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`loading-container ${fadeOut ? 'fade-out' : ''}`}>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Plans" element={<Plans />} />
            <Route path="/VClass" element={<VClass />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/Request" element={<Request />} />
            
            {/* Protect Employee route with Employee Check */}
            <Route 
              path="/Employee" 
              element={isEmployee ? <Employee /> : <Navigate to="/Home" />} 
            />
            
            {/* Protect Admin route with Admin Check */}
            <Route 
              path="/Admin" 
              element={isAdmin ? <Admin /> : <Navigate to="/Home" />} 
            />

            {/* Redirect non-authenticated users */}
            {isAuthenticated === false && (
              <Route path="*" element={<Navigate to="/Register" />} />
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
