import React from 'react';
import './ProductList.css'; // Asegúrate de renombrar el archivo CSS si es necesario

const ProductList = ({ products, title }) => {
  return (
    <div className="product-list-container">
      <h2 className="product-list-title">{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
              ))}
            </div>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button className="add-to-cart-button">🛒</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
