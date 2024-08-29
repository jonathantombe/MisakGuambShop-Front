import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

// Import images
import bolso1 from '../../assets/products/bolso1.png';
import bolso2 from '../../assets/products/bolso2.png';
import bolso3 from '../../assets/products/bolso3.png';
import bolso4 from '../../assets/products/bolso4.png';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [bolso1, bolso2, bolso3, bolso4];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(goToNext, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slider-container">
      <button 
        onClick={goToPrevious} 
        className="slider-button slider-button-left" 
        aria-label="Previous slide"
      >
        ❮
      </button>
      <div className="slider-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((img, index) => (
          <img 
            key={index}
            src={img} 
            alt={`Slide ${index + 1}`} 
            className="slider-image"
          />
        ))}
      </div>
      <button 
        onClick={goToNext} 
        className="slider-button slider-button-right" 
        aria-label="Next slide"
      >
        ❯
      </button>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;