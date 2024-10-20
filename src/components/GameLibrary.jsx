import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Typography, Layout } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Correctly import db from firebase.js
import '@fontsource/poppins';     // Poppins font

const { Title } = Typography;
const { Content } = Layout;

const GameLibrary = () => {
  const [games, setGames] = useState([]);

  // Fetch games from Firestore
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesCollection = collection(db, 'games'); // Access the 'games' collection from Firestore
        const gamesSnapshot = await getDocs(gamesCollection); // Fetch all game documents
        const gamesList = gamesSnapshot.docs.map(doc => doc.data()); // Map documents to game data
        setGames(gamesList);
      } catch (error) {
        console.error("Error fetching games: ", error);
      }
    };

    fetchGames(); // Call the fetch function when component mounts
  }, []);

  return (
    <Layout style={{ backgroundColor: '#121212', minHeight: '100vh', fontFamily: 'Poppins' }}>
      <Content style={{ padding: '50px' }}>
        <div style={styles.gridBackground}>
          <Title style={{ color: '#fff', fontSize: '36px', textAlign: 'center' }}>
            Explore & Download VR Games
          </Title>

          <Row gutter={[16, 16]} justify="center" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            {games.map((game, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={<img alt={game.title} src={game.imageUrl} />}
                  style={styles.cardStyle}
                >
                  <Card.Meta
                    title={<Title level={5} style={{ color: '#fff' }}>{game.title}</Title>}
                    description={<span style={{ color: '#aaa' }}>{game.description}</span>}
                  />
                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    href={game.playStoreLink}
                    target="_blank"
                    style={{ marginTop: '15px', width: '100%' }}
                  >
                    Download
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

const styles = {
  cardStyle: {
    backgroundColor: '#333',
    color: '#fff',
    border: '1px solid #444',
  },
  gridBackground: {
    background: 'linear-gradient(145deg, #1a1a1a, #292929)',
    padding: '30px',
    borderRadius: '10px',
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '10px',
  },
};

export default React.memo(GameLibrary);
