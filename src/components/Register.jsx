import React, { useState } from 'react';
import { Button, Card, Typography, Divider, message, Input, Radio } from 'antd';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'; // Make sure Firestore is imported
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore'; // For saving data in Firestore

import logo from '../assets/vervelogo.png';
import '../styles/register.css';

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name field for normal users
  const [contactNumber, setContactNumber] = useState(''); // Added contact number field for normal users
  const [isLogin, setIsLogin] = useState(false); // Toggle between signup and login
  const [loading, setLoading] = useState(false); // Loading state
  const [accountType, setAccountType] = useState('user'); // Account type ('user' or 'organization')
  
  // Organization-specific fields
  const [institutionName, setInstitutionName] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  // Handle email and password sign-up
  const handleEmailSignUp = async () => {
    if (!email || !password || !name || !contactNumber) {
      message.error('Please fill in all fields.');
      return;
    }
    
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user or organization details in Firestore
      if (accountType === 'organization') {
        // Save organization details
        await setDoc(doc(db, 'institutions', user.uid), {
          institutionName,
          contactPerson,
          contactNumber,
          email,
        });
        message.success('Organization account created successfully!');
      } else {
        // Save normal user details
        await setDoc(doc(db, 'users', user.uid), {
          name,
          contactNumber,
          email,
        });
        message.success('User account created successfully!');
      }

      console.log('User registered with email:', user);
      navigate('/Home');
    } catch (error) {
      message.error(`Failed to register: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle email and password sign-in
  const handleEmailSignIn = async () => {
    if (!email || !password) {
      message.error('Please enter both email and password.');
      return;
    }
    
    setLoading(true); // Start loading
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in with email:', userCredential.user);
      message.success('Successfully logged in!');
      navigate('/Home');
    } catch (error) {
      message.error(`Failed to log in: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <img src={logo} alt="Verve Logo" className="register-logo" />
        <Title level={3}>{isLogin ? 'Login' : 'Register'}</Title>
        <Text type="secondary" style={{ display: 'block', marginBottom: 10 }}>
          {isLogin ? 'Log in to your account' : 'Join the revolution'}
        </Text>
        <Divider />

        {/* Select account type */}
        {!isLogin && (
          <>
            <Radio.Group
              onChange={(e) => setAccountType(e.target.value)}
              value={accountType}
              style={{ marginBottom: 10 }}
            >
              <Radio value="user">Normal User</Radio>
              <Radio value="organization">Organization</Radio>
            </Radio.Group>
            <Divider />
          </>
        )}

        {/* Email and Password Input Fields */}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        {/* Additional Fields for Normal Users */}
        {accountType === 'user' && !isLogin && (
          <>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </>
        )}

        {/* Organization Fields */}
        {accountType === 'organization' && !isLogin && (
          <>
            <Input
              placeholder="Institution Name"
              value={institutionName}
              onChange={(e) => setInstitutionName(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Contact Person"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              style={{ marginBottom: 10 }}
            />
          </>
        )}

        {/* Toggle between Sign-Up and Log-In */}
        {isLogin ? (
          <Button
            type="primary"
            onClick={handleEmailSignIn}
            style={{ width: '100%', marginBottom: 10 }}
            loading={loading} // Add loading state
          >
            Log in with Email
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleEmailSignUp}
            style={{ width: '100%', marginBottom: 10 }}
            loading={loading} // Add loading state
          >
            Sign up with Email
          </Button>
        )}

        {/* Switch between login and signup */}
        <Text
          type="secondary"
          onClick={() => setIsLogin(!isLogin)}
          style={{ cursor: 'pointer', display: 'block', marginBottom: 20 }}
        >
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Log in'}
        </Text>

        <Divider />
      </Card>
    </div>
  );
};

export default Register;
