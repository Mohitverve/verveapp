import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Stepper, Step, StepLabel } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure your Firebase config is correctly set up
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const steps = ['Basic Information', 'Session Details'];

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    date: '',
    time: '',
    details: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: new Date(),
      });
      alert('Booking submitted successfully!');
      setFormData({
        institutionName: '',
        contactPerson: '',
        email: '',
        date: '',
        time: '',
        details: '',
      });
      setActiveStep(0);
    } catch (error) {
      console.error('Error submitting booking: ', error);
      alert('An error occurred. Please try again.');
    }
  };

  const isLastStep = activeStep === steps.length - 1;

  return (
    <ThemeProvider theme={theme}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 500,
          margin: 'auto',
          mt: 6,
          mb: 12, // Add bottom margin here
          p: 3,
          borderRadius: 3,
          backgroundColor: '#f5f5f5',
          color: '#333',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: '#1976d2',
          }}
        >
          Book a Session
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                label="Institution Name"
                name="institutionName"
                value={formData.institutionName}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
              <TextField
                fullWidth
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
            </>
          )}

          {activeStep === 1 && (
            <>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
              <TextField
                fullWidth
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
              <TextField
                fullWidth
                label="Details"
                name="details"
                multiline
                rows={4}
                value={formData.details}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: '#ffffff',
                  },
                  '& .MuiInputLabel-root': { color: '#757575' },
                }}
              />
            </>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            {activeStep > 0 && (
              <Button
                onClick={handleBack}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Back
              </Button>
            )}
            <Button
              type={isLastStep ? 'submit' : 'button'}
              variant="contained"
              onClick={isLastStep ? handleSubmit : handleNext}
              sx={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              {isLastStep ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default BookingForm;
