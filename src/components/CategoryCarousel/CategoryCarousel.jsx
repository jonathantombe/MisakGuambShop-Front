import React, { useState, useEffect } from 'react';
import './CategoryCarousel.css';

const categories = [
  { name: 'Electrónica', image: 'https://example.com/electronica.jpg' },
  { name: 'Electrodomésticos', image: 'https://example.com/electrodomesticos.jpg' },
  { name: 'Bolsos y maletas', image: 'https://example.com/bolsos.jpg' },
  { name: 'Disfraces', image: 'https://example.com/disfraces.jpg' },
  { name: 'Deporte y ocio', image: 'https://example.com/deporte.jpg' },
  { name: 'Infantil y premamá', image: 'https://example.com/infantil.jpg' },
  { name: 'Informática y escuela', image: 'https://example.com/informatica.jpg' },
  { name: 'Mascotas', image: 'https://example.com/mascotas.jpg' },
  { name: 'Hogar y jardín', image: 'https://example.com/hogar.jpg' },
  { name: 'Moda hombre', image: 'https://example.com/modahombre.jpg' },
  { name: 'Motor', image: 'https://example.com/motor.jpg' },
  { name: 'Zapatos', image: 'https://example.com/zapatos.jpg' },
  { name: 'Moda mujer', image: 'https://example.com/modamujer.jpg' },
  { name: 'Juguetes y juegos', image: 'https://example.com/juguetes.jpg' },
  { name: 'Telefónica y comunicación', image: 'https://example.com/telefonia.jpg' },
  { name: 'Muebles', image: 'https://example.com/muebles.jpg' },
  { name: 'Seguridad', image: 'https://example.com/seguridad.jpg' },
  { name: 'Cabello y pelucas', image: 'https://example.com/cabello.jpg' },
  { name: 'Accesorios', image: 'https://example.com/accesorios.jpg' }
];

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleItems = 8;
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prevIndex) =>
          prevIndex === categories.length - visibleItems ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(autoScroll);
  }, [isHovered]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - visibleItems : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categories.length - visibleItems ? 0 : prevIndex + 1
    );
  };

  return (
    <div 
      className="carousel-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2 className="carousel-title">Compra por categorías</h2>
      <div className="carousel">
        <button className="carousel-button prev-button" onClick={handlePrevClick}>
          &lt;
        </button>
        <div className="carousel-track">
          {categories.slice(currentIndex, currentIndex + visibleItems).map((category, index) => (
            <div className="carousel-item" key={index}>
              <img src={category.image} alt={category.name} className="carousel-image" />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
        <button className="carousel-button next-button" onClick={handleNextClick}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
