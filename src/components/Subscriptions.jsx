import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { HomeOutlined, CodeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import '../styles/pricing.css';
import OrbitalCircles from './OrbitalCircles';

const { Meta } = Card;
const { Title } = Typography;

const services = [
  {
    title: 'Conduct VR Tests',
    description: 'Now revolutionise the future of classrooms test with VR, Book a VR test.',
    icon: <HomeOutlined />,
  },
  {
    title: 'Buy VR content',
    description: 'Now subscribe to our VR content Plans ranging from monthly, quarterly, and yearly.',
    icon: <CodeOutlined />,
  },
  {
    title: 'Delivery Partner Program',
    description: 'Our special program to facilitate smooth delivery of VR tests. Join us for a minimum fee.',
    icon: <UsergroupAddOutlined />,
  },
];

const Subscriptions = () => {
  return (
    <section className="our-services-section">
      <div className="background-elements">
        <div className="orbital-circles">
          <OrbitalCircles />
        </div>
      </div>
      <div className="our-services-container">
        <h1 className="services-heading">Subscriptions Plans</h1>
        <Row gutter={[16, 16]} justify="center">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <div className="stacked-card">
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
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Subscriptions;
