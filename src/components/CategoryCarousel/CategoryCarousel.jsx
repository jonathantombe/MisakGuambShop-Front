import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../services/categories/categories';
import './CategoryCarousel.css';

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleCategoryClick = (category) => {
    // Pasar toda la información de la categoría en el estado de navegación
    navigate(`/category/${category.id}`, {
      state: {
        categoryName: category.name,
        categoryDescription: category.description
      }
    });
  };

  return (
    <div className="carousel-categories">
      <h2 className="carousel-title">Descubre Artesanías por Categoría</h2>
      <div className="carousel-wrapper">
        <div ref={carouselRef} className="carousel-items-container">
          {categories.map((category) => (
            <div
              key={category.id}
              className="carousel-item"
              onClick={() => handleCategoryClick(category)}
              role="button"
              tabIndex={0}
            >
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