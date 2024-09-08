import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { HomeOutlined, CodeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import '../styles/services.css';
import OrbitalCircles from './OrbitalCircles';

const { Meta } = Card;
const { Title } = Typography;

const services = [
  {
    title: 'Service One',
    description: 'Detailed description of Service One goes here. It provides amazing benefits.',
    icon: <HomeOutlined />,
  },
  {
    title: 'Service Two',
    description: 'Detailed description of Service Two goes here. It offers unique features.',
    icon: <CodeOutlined />,
  },
  {
    title: 'Service Three',
    description: 'Detailed description of Service Three goes here. It includes various options.',
    icon: <UsergroupAddOutlined />,
  },
];

const OurServices = () => {
  return (
    <section className="our-services-section">
      <div className="background-elements">
        <div className="orbital-circles">
          <OrbitalCircles />
        </div>
      </div>
      <div className="our-services-container">
        <Title level={2} className="services-heading">
          Our Services
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                bordered={false}
                className="service-card"
                cover={<div className="service-icon">{service.icon}</div>}
              >
                <Meta
                  title={<div className="service-title">{service.title}</div>}
                  description={<div className="service-description">{service.description}</div>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default OurServices;