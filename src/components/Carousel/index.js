import React, { useEffect } from 'react';
import { faPerson, faTruck, faUsers, faTree, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CarouselCard from './carouselCard';
import { handleCarouselScroll } from './carouselScroll';
import './styles.css';

const Carousel = ({ items }) => {
  useEffect(() => {
    handleCarouselScroll();
  }, []);

  const icons = [faPerson, faTruck, faUsers, faTree, faCartShopping];

  return (
    <div className="carousel">
      {items.map((item, index) => (
        <CarouselCard
          key={index}
          title={item.title}
          path={item.path}
          icon={icons[index % icons.length]}
        />
      ))}
    </div>
  );
};

export default Carousel;