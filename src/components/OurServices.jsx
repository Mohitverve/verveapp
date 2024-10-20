import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { HomeOutlined, CodeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import '../styles/services.css';
import OrbitalCircles from './OrbitalCircles';

const { Meta } = Card;
const { Title } = Typography;

const services = [
  {
    title: 'V-Class',
    description: 'Now revolutionise the future of classrooms VR, Book a V-class today.',
    icon: <HomeOutlined />,
  },
  {
    title: 'V-Book',
    description: 'Our high quality Virtual Reality content comprised in one single application.',
    icon: <CodeOutlined />,
  },
  {
    title: 'Delivery Partner Program',
    description: 'Our special program to facilitate smooth delivery of VR tests. Join us for a minimum fee.',
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
        <motion.h1
          className="services-heading"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our services
        </motion.h1>
        <Row gutter={[16, 16]} justify="center">
          {services.map((service, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <motion.div
                className="stacked-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
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
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default React.memo(OurServices);
