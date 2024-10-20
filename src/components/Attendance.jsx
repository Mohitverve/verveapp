import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Typography,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Snackbar,
  Box,
  Divider,
  TableContainer,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, addDoc, deleteDoc, doc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import dayjs from 'dayjs';

const Attendance = () => {
  const [user, setUser] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAttendance, setMarkingAttendance] = useState(false);
  const [markingLeave, setMarkingLeave] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, recordId: null, type: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchAttendance(user.uid);
        fetchLeaves(user.uid);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Snackbar handler
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Function to mark attendance
  const markAttendance = useCallback(async () => {
    if (user) {
      setMarkingAttendance(true);
      const attendanceDate = dayjs().format('YYYY-MM-DD');
      try {
        await addDoc(collection(db, 'attendance'), {
          userId: user.uid,
          userName: user.displayName || user.email,
          date: attendanceDate,
          timestamp: new Date(),
        });
        setSnackbar({ open: true, message: 'Attendance marked successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to mark attendance.', severity: 'error' });
      } finally {
        setMarkingAttendance(false);
        fetchAttendance(user.uid); // Refresh attendance after marking
      }
    }
  }, [user]);

  // Function to mark leave
  const markLeave = useCallback(async () => {
    if (user) {
      setMarkingLeave(true);
      const leaveDate = dayjs().format('YYYY-MM-DD');
      try {
        await addDoc(collection(db, 'leaves'), {
          userId: user.uid,
          userName: user.displayName || user.email,
          date: leaveDate,
          timestamp: new Date(),
        });
        setSnackbar({ open: true, message: 'Leave marked successfully!', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Failed to mark leave.', severity: 'error' });
      } finally {
        setMarkingLeave(false);
        fetchLeaves(user.uid); // Refresh leave records after marking
      }
    }
  }, [user]);

  // Fetch attendance records from Firestore
  const fetchAttendance = useCallback(async (userId) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'attendance'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAttendanceRecords(records);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch attendance.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch leave records from Firestore
  const fetchLeaves = useCallback(async (userId) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'leaves'),
        where('userId', '==', userId),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setLeaveRecords(records);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to fetch leave records.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  // Confirm delete dialog
  const handleDelete = useCallback((id, type) => {
    setConfirmDelete({ open: true, recordId: id, type });
  }, []);

  const confirmDeleteAction = async () => {
    const { recordId, type } = confirmDelete;
    try {
      if (type === 'attendance') {
        await deleteDoc(doc(db, 'attendance', recordId));
        fetchAttendance(user.uid);
      } else if (type === 'leave') {
        await deleteDoc(doc(db, 'leaves', recordId));
        fetchLeaves(user.uid);
      }
      setSnackbar({ open: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`, severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: `Failed to delete ${type}.`, severity: 'error' });
    } finally {
      setConfirmDelete({ open: false, recordId: null, type: '' });
    }
  };

  const cancelDeleteAction = () => {
    setConfirmDelete({ open: false, recordId: null, type: '' });
  };

  // Function to calculate attendance percentage
  const calculateAttendancePercentage = () => {
    const totalDays = 30; // Assuming a 30-day month
    const attendanceDays = attendanceRecords.length;
    return ((attendanceDays / totalDays) * 100).toFixed(2);
  };

  return (
    <Container sx={{ fontFamily: 'Poppins', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', color: '#333' }}>Mark Your Attendance or Leave</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <Button
          variant="contained"
          color="primary"
          onClick={markAttendance}
          disabled={markingAttendance}
          sx={{ marginRight: '10px' }}
        >
          {markingAttendance ? <CircularProgress size={24} /> : 'Mark Attendance'}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={markLeave}
          disabled={markingLeave}
        >
          {markingLeave ? <CircularProgress size={24} /> : 'Mark Leave'}
        </Button>
        <Box>
          <Typography variant="h6" sx={{ color: '#666' }}>
            Overall Attendance: {calculateAttendancePercentage()}%
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ marginBottom: '20px' }} />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Attendance and Leave Records</Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Timestamp</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Attendance Records */}
                {attendanceRecords.length > 0 ? attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>Present</TableCell>
                    <TableCell>{new Date(record.timestamp.toMillis()).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(record.id, 'attendance')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={4}>No attendance records found.</TableCell></TableRow>}

                {/* Leave Records */}
                {leaveRecords.length > 0 ? leaveRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>On Leave</TableCell>
                    <TableCell>{new Date(record.timestamp.toMillis()).toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(record.id, 'leave')}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) : <TableRow><TableCell colSpan={4}>No leave records found.</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete.open} onClose={cancelDeleteAction}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {confirmDelete.type} record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteAction} color="primary">Cancel</Button>
          <Button onClick={confirmDeleteAction} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Attendance;
