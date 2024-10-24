import React, { useState } from 'react';
import { Button, Card, Typography, Divider, message, Input, Spin } from 'antd';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/vervelogo.png';
import '../styles/register.css';

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false); // Toggle between signup and login
  const [loading, setLoading] = useState(false); // Loading state

  // Handle email and password sign-up
  const handleEmailSignUp = async () => {
    if (!email || !password) {
      message.error('Please enter both email and password.');
      return;
    }
    
    setLoading(true); // Start loading
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered with email:', userCredential.user);
      message.success('Successfully registered!');
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
