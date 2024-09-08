import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Typography, Button, Card, Space } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import aboutImage from '../assets/headset.png'; // Replace with your actual image path
import '../styles/about.css';

const { Title, Paragraph } = Typography;

const About = () => {
  const aboutRef = useRef(null);


  return (
    <section id="about-us" ref={aboutRef} className="about-section">
  

      <div className="about-container">
        <Card bordered={false} className="about-card">
          <Row gutter={[32, 32]} justify="center" align="middle">
            <Col xs={24} sm={24} md={12} lg={12}>
              <div className="about-image-container">
                <img
                  className="about-image"
                  loading="lazy"
                  src={aboutImage}
                  alt="About Us"
                  width="100%"
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Space direction="vertical" size="middle">
                <Title level={1} className="about-title">
                  About Us
                </Title>
                <Paragraph className="about-paragraph">
                  At VerveIN, we're revolutionizing education by bringing immersive virtual reality experiences straight to your institution's doorstep.
                </Paragraph>
                <Paragraph className="about-paragraph">
                  We offer easy scheduling of VR sessions for captivating lessons, interactive projects, and more. Our VR simulation team works closely with your teachers to transport your students into a world of discovery.
                </Paragraph>
                <Button type="primary" icon={<ZoomInOutlined />} size="large" className="about-button">
                  Learn More
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </div>
      
    </section>
     
     
  
  );
};

export default About;
