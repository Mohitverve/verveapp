import React, { useEffect, useState, useMemo, useCallback, Suspense } from 'react';
import { Typography, Grid } from '@mui/material';
import { Table, Modal, Input, Form, Spin } from 'antd';
import { BarChartOutlined, UsergroupAddOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { collection, getDocs, onSnapshot, query, where, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import GameUploadForm from './GameUploadForm';
import '../styles/admin.css';
import { motion } from 'framer-motion';


const StatCard = ({ title, value, icon, color }) => (
  <div className="stat-card">
    <div className="stat-icon" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="stat-content">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [gamesListed, setGamesListed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalDeliveryPartners, setTotalDeliveryPartners] = useState(0);
  const [totalGamesUploaded, setTotalGamesUploaded] = useState(0);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [totalSessionsSnapshot, deliveryPartnersSnapshot, gamesSnapshot, attendanceSnapshot, leaveSnapshot] = await Promise.all([
        getDocs(collection(db, 'bookings')),
        getDocs(collection(db, 'DeliveryPartners')),
        getDocs(collection(db, 'Games')),
        getDocs(collection(db, 'attendance')),
        getDocs(collection(db, 'leaves')),
      ]);

      setTotalSessions(totalSessionsSnapshot.size);
      setTotalDeliveryPartners(deliveryPartnersSnapshot.size);
      setTotalGamesUploaded(gamesSnapshot.size);

      setAttendanceData(attendanceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLeaveData(leaveSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribePending = onSnapshot(query(collection(db, 'bookings'), where('status', '==', 'pending')), (snapshot) => {
      setPendingRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubscribeCompleted = onSnapshot(query(collection(db, 'bookings'), where('status', '==', 'completed')), (snapshot) => {
      setCompletedRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    fetchDashboardData();

    const unsubscribeGames = onSnapshot(collection(db, 'Games'), (snapshot) => {
      setGamesListed(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribePending();
      unsubscribeCompleted();
      unsubscribeGames();
    };
  }, [fetchDashboardData]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
        alert('Request deleted successfully');
      } catch (error) {
        console.error('Error deleting request:', error);
        alert('Error deleting the request.');
      }
    }
  };

  const handleModify = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const columns = useMemo(
    () => [
      { title: 'Institution Name', dataIndex: 'institutionName', key: 'institutionName' },
      { title: 'Contact Person', dataIndex: 'contactPerson', key: 'contactPerson' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Time', dataIndex: 'time', key: 'time' },
      { title: 'Status', dataIndex: 'status', key: 'status' },
      { title: 'Details', dataIndex: 'details', key: 'details' },
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <>
            <button onClick={() => handleModify(record)}>Modify</button>
            <button onClick={() => handleDelete(record.id)} style={{ marginLeft: 8, color: 'red' }}>
              Delete
            </button>
          </>
        ),
      },
    ],
    []
  );

  const attendanceColumns = [
    { title: 'Employee Name', dataIndex: 'userName', key: 'userName' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (ts) => (ts ? ts.toDate().toLocaleString() : 'N/A'),
    },
  ];

  const leaveColumns = [
    { title: 'Employee Name', dataIndex: 'userName', key: 'userName' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (ts) => (ts ? ts.toDate().toLocaleString() : 'N/A'),
    },
  ];

  return (
    <div className="admin-dashboard">
    <motion.h1
          className="dashboard-header"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
         Admin Dashboard 
        </motion.h1>
      <Grid container spacing={3} className="stats-container">
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Sessions" 
            value={totalSessions} 
            icon={<BarChartOutlined />} 
            color="#4361ee"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Delivery Partners" 
            value={totalDeliveryPartners} 
            icon={<UsergroupAddOutlined />} 
            color="#3a0ca3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Games Uploaded" 
            value={totalGamesUploaded} 
            icon={<ShoppingCartOutlined />} 
            color="#7209b7"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Completed Requests" 
            value={completedRequests.length} 
            icon={<CheckCircleOutlined />} 
            color="#4cc9f0"
          />
        </Grid>
      </Grid>

      <div className='game'>
        <GameUploadForm />
      </div>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Pending Requests
      </Typography>
      <Suspense fallback={<Spin />}>
        <Table dataSource={pendingRequests} columns={columns} loading={loading} rowKey="id" pagination={{ pageSize: 10 }} />
      </Suspense>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Completed Requests
      </Typography>
      <Suspense fallback={<Spin />}>
        <Table dataSource={completedRequests} columns={columns} loading={loading} rowKey="id" pagination={{ pageSize: 10 }} />
      </Suspense>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Attendance
      </Typography>
      <Suspense fallback={<Spin />}>
        <Table dataSource={attendanceData} columns={attendanceColumns} loading={loading} rowKey="id" pagination={{ pageSize: 10 }} />
      </Suspense>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Leave Requests
      </Typography>
      <Suspense fallback={<Spin />}>
        <Table dataSource={leaveData} columns={leaveColumns} loading={loading} rowKey="id" pagination={{ pageSize: 10 }} />
      </Suspense>

      <Modal
        title="Modify Request"
        visible={isModalVisible}
        onOk={() => {
          form.validateFields().then(async (values) => {
            // Handle form submission
            form.resetFields();
            setIsModalVisible(false);
          });
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Institution Name" name="institutionName">
            <Input />
          </Form.Item>
          <Form.Item label="Contact Person" name="contactPerson">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Details" name="details">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default React.memo(AdminDashboard);