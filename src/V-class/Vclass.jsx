import React from 'react';
import { Layout, Typography, Card, Row, Col, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import vidImg from "../assets/asset1.jpg";

const { Content } = Layout;
const { Title, Text } = Typography;

// Fake data for demonstration
const subscriptionPlans = [
  { name: 'Basic', price: '$9.99/month' },
  { name: 'Pro', price: '$19.99/month' },
  { name: 'Enterprise', price: 'Custom' },
];

const contentThumbnails = [
  { title: 'Video 1', description: 'Description 1', image: vidImg },
  { title: 'Video 2', description: 'Description 3', image: vidImg },
  { title: 'Video 3', description: 'Description 4', image: vidImg },
];

const Vclass = () => {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#808080', // White theme
        backgroundImage: `
          radial-gradient(circle, #000000 1px, transparent 1px)`,
        backgroundSize: '40px 40px, 40px 40px, 80px 80px, 80px 80px',
      }}
    >
      <Content style={{ padding: '2rem', width: '100%', maxWidth: '1200px' }}>
        <div
          style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Title
            level={2}
            style={{
              fontFamily: 'Poppins, sans-serif',
              marginBottom: '2rem',
              textAlign: 'center',
            }}
          >
            Content Library
          </Title>

          {/* Subscription Plans Section */}
          <section style={{ marginBottom: '3rem' }}>
            <Title
              level={3}
              style={{
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Subscription Plans
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {subscriptionPlans.map((plan, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card
                    hoverable
                    style={{
                      background: '#f0f2f5',
                      borderRadius: '8px',
                      height: '100%',
                      textAlign: 'center',
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {plan.name}
                    </Title>
                    <Text strong>{plan.price}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          {/* Content Thumbnails Section */}
          <section>
            <Title
              level={3}
              style={{
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Content Thumbnails
            </Title>
            <Row gutter={[16, 16]} justify="center">
              {contentThumbnails.map((content, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ position: 'relative' }}>
                        <img
                          alt={content.title}
                          src={content.image}
                          style={{
                            width: '100%',
                            height: '150px',
                            objectFit: 'cover',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <PlayCircleOutlined
                            style={{ fontSize: '3rem', color: '#fff' }}
                          />
                        </div>
                      </div>
                    }
                    style={{ background: '#f0f2f5' }}
                  >
                    <Card.Meta
                      title={<span>{content.title}</span>}
                      description={<span>{content.description}</span>}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                    <Button
                      type="primary"
                      style={{
                        marginTop: '1rem',
                        background: '#1890ff',
                        borderColor: '#1890ff',
                      }}
                    >
                      Watch Now
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </div>
      </Content>
    </Layout>
  );
};

export default Vclass;
