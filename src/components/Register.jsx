// Register.js
import React from 'react';
import { Button, Card, Typography, Divider, message } from 'antd';
import { GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from './firebase';
import logo from '../assets/vervelogo.png'; // Update path to your logo
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Import external CSS for custom styles

const { Title, Text } = Typography;

const Register = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      message.success('Successfully signed in with Google!');
      navigate('/Home'); // Navigate to Home on successful signup
    } catch (error) {
      message.error('Failed to sign in with Google.');
      console.error(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      message.success('Successfully signed in with GitHub!');
      navigate('/home'); // Navigate to Home on successful signup
    } catch (error) {
      message.error('Failed to sign in with GitHub.');
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        {/* Logo */}
        <img src={logo} alt="Logo" className="register-logo" />

        {/* Title */}
        <Title level={3}>Register</Title>

        {/* Join the revolution text */}
        <Text type="secondary" style={{ display: 'block', marginBottom: 10 }}>
          Join the revolution
        </Text>

        {/* Divider Line */}
        <Divider />

        {/* Sign-in Buttons */}
        <Button
          type="primary"
          icon={<GoogleOutlined />}
          onClick={handleGoogleSignIn}
          style={{ width: '100%', marginBottom: 10 }}
        >
          Sign in with Google
        </Button>
        <Button
          type="default"
          icon={<GithubOutlined />}
          onClick={handleGithubSignIn}
          style={{ width: '100%' }}
        >
          Sign in with GitHub
        </Button>
      </Card>
    </div>
  );
};

export default React.memo(Register);
