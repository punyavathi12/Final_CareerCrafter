import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const VideoPlayer = ({ width = "600", height = "400" }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <video width={width} height={height} controls>
        <source src='./Images/video.mp4' type="video/mp4" />
        
      </video>
    </div>
  );
};

export default VideoPlayer;
