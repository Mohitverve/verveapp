import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Avatar,
  ListItemAvatar,
} from '@mui/material';
import { CheckCircleOutline, PendingActions, School } from '@mui/icons-material';

const DeliveryPartners = () => {
  const [requests, setRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), where('status', 'in', ['pending', 'accepted']));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requestsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRequests(requestsData);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: 'accepted',
      });
    } catch (error) {
      console.error('Error accepting request: ', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateDoc(doc(db, 'bookings', id), {
        status: 'completed',
      });
    } catch (error) {
      console.error('Error completing request: ', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredRequests = requests.filter(
    (request) =>
      (tabValue === 0 && request.status === 'pending') ||
      (tabValue === 1 && request.status === 'accepted')
  );

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Paper
        sx={{
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
        }}
        elevation={4}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: '#3f51b5',
          }}
        >
          Delivery Partner Dashboard
        </Typography>

        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          sx={{
            mb: 3,
            '.MuiTab-root': {
              fontFamily: 'Poppins, sans-serif',
              textTransform: 'none',
            },
            '.Mui-selected': {
              color: '#3f51b5',
              fontWeight: 'bold',
            },
            indicator: {
              backgroundColor: '#3f51b5',
            },
          }}
        >
          <Tab label="Pending Requests" icon={<PendingActions />} iconPosition="start" />
          <Tab label="Accepted Requests" icon={<CheckCircleOutline />} iconPosition="start" />
        </Tabs>

        <List sx={{ backgroundColor: '#ffffff', borderRadius: 2 }}>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <ListItem
                key={request.id}
                divider
                sx={{
                  py: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#3f51b5' }}>
                    <School />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {request.institutionName}
                    </Typography>
                  }
                  secondary={`${request.date} at ${request.time}`}
                />

                {request.status === 'pending' ? (
                  <Button
                    onClick={() => handleAccept(request.id)}
                    variant="outlined"
                    sx={{
                      borderColor: '#3f51b5',
                      color: '#3f51b5',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                        borderColor: '#3f51b5',
                      },
                    }}
                  >
                    Accept
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleComplete(request.id)}
                    variant="contained"
                    sx={{
                      backgroundColor: '#4caf50',
                      '&:hover': {
                        backgroundColor: '#45a049',
                      },
                    }}
                  >
                    Complete
                  </Button>
                )}
              </ListItem>
            ))
          ) : (
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, fontFamily: 'Poppins, sans-serif' }}
            >
              No requests to show.
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default React.memo(DeliveryPartners);
