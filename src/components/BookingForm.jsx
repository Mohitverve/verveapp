import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, Stepper, Step, StepLabel, Select, MenuItem, InputLabel, FormControl, Modal, IconButton } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Ensure your Firebase config is correctly set up
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { debounce } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const steps = ['Basic Information', 'Session Details'];

const useForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (step) => {
    let newErrors = {};
    if (step === 0) {
      if (!formData.institutionName) newErrors.institutionName = 'Institution Name is required';
      if (!formData.contactPerson) newErrors.contactPerson = 'Contact Person is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.address) newErrors.address = 'Address is required';
    } else if (step === 1) {
      if (!formData.date) newErrors.date = 'Date is required';
      if (!formData.time) newErrors.time = 'Time is required';
      if (!formData.topic) newErrors.topic = 'Topic is required';
      if (!formData.numberOfStudents) newErrors.numberOfStudents = 'Number of Students is required';
    }
    return newErrors;
  };

  return { formData, setFormData, errors, handleChange, validateForm };
};

const BookingForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [pricePerStudent, setPricePerStudent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { formData, setFormData, errors, handleChange, validateForm } = useForm({
    institutionName: '',
    contactPerson: '',
    email: '',
    address: '',
    topic: '',
    numberOfStudents: '',
    date: '',
    time: '',
    details: '',
    location: '',
    totalPrice: 0,
    schoolType: '', // Added for school type selection
  });

  const handleNext = () => {
    const validationErrors = validateForm(activeStep);
    if (Object.keys(validationErrors).length === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(activeStep);
    if (Object.keys(validationErrors).length === 0) {
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
          address: '',
          topic: '',
          numberOfStudents: '',
          date: '',
          time: '',
          details: '',
          location: '',
          totalPrice: 0,
          schoolType: '', // Reset school type on submission
        });
        setActiveStep(0);
        setPricePerStudent(0); // Reset price per student
      } catch (error) {
        console.error('Error submitting booking: ', error);
        alert('An error occurred. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // You can use these coordinates with reverse geocoding to get the address
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to fetch location. Please allow location access and try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=22ffc993cf6144cc914040c3a7bb3bdc`);
  
      if (response.data && response.data.results && response.data.results.length > 0) {
        const components = response.data.results[0].components;
        const city = components.city || components.town || components.village || components.suburb || 'Unknown city';
        const state = components.state || 'Unknown state';
        const country = components.country || 'Unknown country';
        
        setFormData((prevData) => ({
          ...prevData,
          address: `${city}, ${state}, ${country}`,
        }));
      } else {
        console.error('No location results found in API response');
        alert('Location details could not be fetched.');
      }
    } catch (error) {
      // Log full error details to the console
      console.error('Error fetching reverse geocode:', error.toJSON()); // .toJSON() gives more details on the error
      alert('Unable to fetch location. Please try again.');
    }
  };
  
  
  
  

  const updateTotalPrice = debounce(() => {
    const total = formData.numberOfStudents * pricePerStudent;
    setFormData((prev) => ({
      ...prev,
      totalPrice: total,
    }));
  }, 300);

  useEffect(() => {
    if (formData.numberOfStudents) {
      updateTotalPrice();
    }
  }, [formData.numberOfStudents, pricePerStudent]);

  const handleSchoolTypeChange = (e) => {
    const selectedType = e.target.value;
    setFormData((prev) => ({ ...prev, schoolType: selectedType }));

    // Set price per student based on school type
    switch (selectedType) {
      case 'government':
        setPricePerStudent(70);
        break;
      case 'private':
        setPricePerStudent(100);
        break;
      case 'college':
        setPricePerStudent(130);
        break;
      default:
        setPricePerStudent(0);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const isLastStep = activeStep === steps.length - 1;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `radial-gradient(circle, #808080 1px, rgba(0,0,0,0) 1px)`,
          backgroundSize: '20px 20px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            maxWidth: 500,
            margin: 'auto',
            mt: 6,
            mb: 12,
            p: 3,
            borderRadius: 3,
            backgroundColor: '#fff',
            color: '#333',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}
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
                  error={!!errors.institutionName}
                  helperText={errors.institutionName}
                />
                <TextField
                  fullWidth
                  label="Contact Person"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.contactPerson}
                  helperText={errors.contactPerson}
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
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.address}
                  helperText={errors.address}
                />
                <Button onClick={fetchLocation} variant="contained" sx={{ mt: 2 }}>
                  Fetch Location
                </Button>
                <FormControl fullWidth margin="normal" required error={!!errors.schoolType}>
                  <InputLabel id="school-type-label">School Type</InputLabel>
                  <Select
                    labelId="school-type-label"
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleSchoolTypeChange}
                  >
                    <MenuItem value="government">Government</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="college">College</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            {activeStep === 1 && (
              <>
                <TextField
                  fullWidth
                  label="Topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.topic}
                  helperText={errors.topic}
                />
                <TextField
                  fullWidth
                  label="Number of Students"
                  name="numberOfStudents"
                  type="number"
                  value={formData.numberOfStudents}
                  onChange={handleChange}
                  margin="normal"
                  required
                  error={!!errors.numberOfStudents}
                  helperText={errors.numberOfStudents}
                />
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  margin="normal"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.date}
                  helperText={errors.date}
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.time}
                  helperText={errors.time}
                />
                <TextField
                  fullWidth
                  label="Additional Details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={3}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Total Price: ₹{formData.totalPrice}
                </Typography>
                <Button onClick={handleOpenModal} variant="outlined" sx={{ mt: 1 }}>
                  View Price Breakdown
                </Button>
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="contained"
                sx={{ mr: 2 }}
              >
                Back
              </Button>
              {isLastStep ? (
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              ) : (
                <Button onClick={handleNext} variant="contained" color="primary">
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Price Breakdown Modal */}
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Paper
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: 4,
              maxWidth: 400,
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Price Breakdown</Typography>
              <IconButton onClick={handleCloseModal}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body1">
              Price per Student: ₹{pricePerStudent}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Number of Students: {formData.numberOfStudents}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total Price: ₹{formData.totalPrice}
            </Typography>
            <Button onClick={handleCloseModal} variant="contained" fullWidth sx={{ mt: 3 }}>
              Close
            </Button>
          </Paper>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default React.memo(BookingForm);
