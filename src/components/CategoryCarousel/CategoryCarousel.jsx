import React, { useState, useRef, useEffect } from 'react';

import './CategoryCarousel.css';

const categories = [
  { id: 1, name: 'Chumbe', image: '/api/placeholder/80/80' },
  { id: 2, name: 'Manillas', image: '/api/placeholder/80/80' },
  { id: 3, name: 'Aretes', image: '/api/placeholder/80/80' },
  { id: 4, name: 'Collar', image: '/api/placeholder/80/80' },
  { id: 5, name: 'Sombreros', image: '/api/placeholder/80/80' },
  { id: 6, name: 'Manillas', image: '/api/placeholder/80/80' },
  { id: 7, name: 'Camisas', image: '/api/placeholder/80/80' },
  { id: 8, name: 'Pantalones', image: '/api/placeholder/80/80' },
  { id: 9, name: 'Zapatos', image: '/api/placeholder/80/80' },
  { id: 10, name: 'Joyas', image: '/api/placeholder/80/80' },
  { id: 11, name: 'Decoracion', image: '/api/placeholder/80/80' },
  { id: 12, name: 'Hogar y jardín', image: '/api/placeholder/80/80' },
  { id: 13, name: 'Muebles', image: '/api/placeholder/80/80' },
  { id: 14, name: 'Electrónica', image: '/api/placeholder/80/80' },
  { id: 15, name: 'Bolsos y maletas', image: '/api/placeholder/80/80' },
  { id: 16, name: 'Bisutería y relojes', image: '/api/placeholder/80/80' },
  { id: 17, name: 'Hogar y jardín', image: '/api/placeholder/80/80' },
  { id: 18, name: 'Muebles', image: '/api/placeholder/80/80' },
  { id: 19, name: 'Electrónica', image: '/api/placeholder/80/80' },
  { id: 20, name: 'Bolsos y maletas', image: '/api/placeholder/80/80' },
];

const CategoryCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);

  // Función para manejar el scroll manual con los botones
  const scroll = (direction) => {
    const container = carouselRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Detectar la posición de desplazamiento para mostrar/ocultar el botón izquierdo
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      const handleScroll = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);



  return (
    <div className="carousel-categories">
      <h2 className="carousel-title">Compra por categorías</h2>
      <div className="carousel-wrapper">
        
        
        {/* Contenedor de los ítems de la categoría */}
        <div ref={carouselRef} className="carousel-items-container">
          {categories.map((category) => (
            <div key={category.id} className="carousel-item">
              <div className="carousel-image-wrapper">
                <img
                  src={category.image}
                  alt={category.name}
                  className="carousel-image"
                />
              </div>
              <p className="carousel-item-text">{category.name}</p>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default CategoryCarousel;
