import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { List, ListItem, ListItemText, Button, Typography, Box, Tabs, Tab } from '@mui/material';

const DeliveryPartners = () => {
  const [requests, setRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), where('status', 'in', ['pending', 'accepted']));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: 'accepted'
      });
    } catch (error) {
      console.error('Error accepting request: ', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: 'completed'
      });
    } catch (error) {
      console.error('Error completing request: ', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredRequests = requests.filter(request => 
    (tabValue === 0 && request.status === 'pending') || 
    (tabValue === 1 && request.status === 'accepted')
  );

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Delivery Partner Dashboard</Typography>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange} 
        sx={{ 
          mb: 2, 
          '.MuiTab-root': { 
            color: 'white', 
            fontFamily: 'Poppins, sans-serif' 
          }, 
          '.Mui-selected': { 
            color: 'white', 
            fontFamily: 'Poppins, sans-serif' 
          } 
        }}
      >
        <Tab label="Pending Requests" />
        <Tab label="Accepted Requests" />
      </Tabs>
      <List>
        {filteredRequests.map((request) => (
          <ListItem key={request.id} divider>
            <ListItemText
              primary={request.institutionName}
              secondary={`${request.date} at ${request.time}`}
            />
            {request.status === 'pending' ? (
              <Button onClick={() => handleAccept(request.id)} variant="outlined" sx={{ mr: 1 }}>
                Accept
              </Button>
            ) : (
              <Button onClick={() => handleComplete(request.id)} variant="contained">
                Complete
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DeliveryPartners;
