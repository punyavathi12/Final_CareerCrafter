import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ImageGrid.css'; // Import the custom CSS file

const ImageGrid = () => {
  // Array of image sources
  const images = [
    './Images/im.png',
    './Images/im1.png',
    './Images/im2.png',
    './Images/im3.png',
    './Images/im4.png',
    './Images/im5.png',
    './Images/im6.png',
    './Images/im7.png',
    './Images/im8.png'
  ];

  return (
    <div className="container mt-5">
      <div className="image-box">
        <h2>Featured Companies Actively Hiring</h2>
        <div className="row">
          {images.map((src, index) => (
            <div className="col-lg-4 col-md-6 mb-4" key={index}>
              <div className="card">
                <img src={src} className="card-img-top" alt={`Image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
