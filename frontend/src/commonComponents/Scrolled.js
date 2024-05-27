import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Scroll.css';
function ScrollImages() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Images/scroll1.jpg"
          alt="First slide"
        />
       
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Images/scroll2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Images/scroll4.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Images/scroll6.png"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Images/scroll7.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ScrollImages;
