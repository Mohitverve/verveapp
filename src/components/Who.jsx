import React from 'react';
import { Card } from 'antd';
import '../styles/Who.css';

const people = [
  { name: 'Nick DeJesus', image: 'url_to_image', description: 'Sponsor' },
  { name: 'chaynHQ', image: 'url_to_image', description: 'Sponsor' },
  { name: 'kazuya kawaguchi', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Nikema', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Person 5', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Person 6', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Person 7', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Person 8', image: 'url_to_image', description: 'Sponsor' },
  { name: 'Person 9', image: 'url_to_image', description: 'Sponsor' }
];

const Who = () => {
  return (
    <div className="card-section">
      <div className="card-grid">
        {people.map((person, index) => (
          <Card
            key={index}
            className={`person-card person-card-${index}`}
            hoverable
            cover={<img alt={person.name} src={person.image} />}
          >
            <Card.Meta title={person.name} description={person.description} />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Who;
