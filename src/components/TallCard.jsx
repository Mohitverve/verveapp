import React from "react";
import './TallCard.css';

const TallCard = ({ title, description, imgSrc }) => {
  return (
    <div className="tall-card">
      <img className="tall-card-img" src={imgSrc} alt={title} />
      <div className="tall-card-content">
        <h2 className="tall-card-title">{title}</h2>
        <p className="tall-card-description">{description}</p>
      </div>
    </div>
  );
};

export default TallCard;
