import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.css';

const CarouselCard = ({ title, path, icon }) => {
  return (
    <Link to={path} className="carousel-card">
      <FontAwesomeIcon icon={icon} className="card-icon" />
      <h3>{title}</h3>
    </Link>
  );
};

export default CarouselCard;