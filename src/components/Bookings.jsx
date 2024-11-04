// src/components/Bookings.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase'; // Adjust the path to your Firebase configuration
import { collection, query, where, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'; // Import necessary Firestore methods
import { getAuth } from 'firebase/auth';
import { DatePicker, TimePicker, Button, List, Typography } from 'antd';
import moment from 'moment';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [userType, setUserType] = useState(null); // For storing user type (organization or normal)

  useEffect(() => {
    const fetchUserBookings = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        // Check user type by querying both collections
        const userRef = doc(db, 'users', userId); // Reference to users collection
        const institutionRef = doc(db, 'institutions', userId); // Reference to institutions collection

        const userDoc = await getDoc(userRef); // Check if user document exists
        const institutionDoc = await getDoc(institutionRef); // Check if institution document exists

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserType('user');
          await fetchBookings(userId, 'users'); // Fetch bookings for normal user
        } else if (institutionDoc.exists()) {
          const institutionData = institutionDoc.data();
          setUserType('organization');
          await fetchBookings(userId, 'institutions'); // Fetch bookings for organization
        } else {
          console.log("User or institution document does not exist.");
        }
      } else {
        console.log("No user is signed in.");
      }
    };

    const fetchBookings = async (userId, collectionName) => {
      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef, where('userId', '==', userId), where('collection', '==', collectionName)); // Adjust based on your data structure
      const querySnapshot = await getDocs(q);

      const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
    };

    fetchUserBookings();
  }, []);

  // Function to handle rebooking
  const handleRebook = async (bookingId) => {
    if (newDate && newTime) {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, {
        sessionDate: newDate.format('YYYY-MM-DD'),
        sessionTime: newTime.format('HH:mm'),
      });

      // Update local state to reflect the changes
      setBookings(prevBookings => prevBookings.map(booking => 
        booking.id === bookingId ? { ...booking, sessionDate: newDate.format('YYYY-MM-DD'), sessionTime: newTime.format('HH:mm') } : booking
      ));
    } else {
      alert('Please select both a date and a time for rebooking.');
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Your VR Session Bookings</Typography.Title>
      <List
        bordered
        dataSource={bookings}
        renderItem={item => (
          <List.Item>
            <Typography.Text>
              {`Date: ${item.sessionDate} | Time: ${item.sessionTime}`}
            </Typography.Text>
            <DatePicker onChange={date => setNewDate(date)} />
            <TimePicker onChange={time => setNewTime(time)} />
            <Button onClick={() => handleRebook(item.id)}>Rebook</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Bookings;
