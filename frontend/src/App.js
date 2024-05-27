import React from 'react';
import './App.css';
import CarouselHome from './commonComponents/carouselHome';
import AboutUs from './commonComponents/aboutUs';
import TestimonialsCarousel from './commonComponents/testimonialCards';
import Header from './commonComponents/header';
import Footer from './commonComponents/footer';
import ScrollImages from './commonComponents/Scrolled';
import VideoPlayer from './commonComponents/video';
import ImageGrid from './commonComponents/imageGrid';

function App() {
  return (
    <>
      <Header />
      <br />
      <ScrollImages />
      <TestimonialsCarousel />
      <video autoPlay muted loop className="bg-video">
        <source src="./Images/video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <ImageGrid />
      <Footer />
    </>
  );
}

export default App;
