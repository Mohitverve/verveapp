// src/App.js
import React, { Suspense, lazy } from 'react';
import { CssBaseline, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import '@fontsource/poppins';
import AppHeader from '../components/Header';

// Dynamically import the Attendance component
const Attendance = lazy(() => import('../components/Attendance'));

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Arial',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const Employee = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppHeader />
      <Suspense fallback={<CircularProgress />}>
        <Attendance />
      </Suspense>
    </ThemeProvider>
  );
};

export default Employee;
