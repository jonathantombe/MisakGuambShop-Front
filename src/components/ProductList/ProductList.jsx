import React from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar al carrito
import './ProductList.css';

const ProductList = ({ products, title }) => {
  const navigate = useNavigate(); // Para la redirección

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      // Si ya existe, incrementa la cantidad
      cart[existingProductIndex].quantity += 1;
    } else {
      // Si no, agregar el producto con cantidad inicial de 1
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Guardar en localStorage
    navigate('/cart'); // Redirigir al carrito
  };

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">{title}</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Imagen del producto */}
            <img src={product.image} alt={product.name} className="product-image" />
            
            {/* Nombre del producto */}
            <h3 className="product-name">{product.name}</h3>
            
            {/* Rating del producto */}
            <div className="product-rating-container">
              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                ))}
              </div>
              <p className="product-rating-value">{product.rating.toFixed(2)}</p>
            </div>
            
            {/* Precios */}
            <div className="product-price-container">
              <p className="product-price">${product.price.toFixed(2)}</p>
              {product.discount && (
                <p className="product-discount">${product.discount}</p>
              )}
            </div>
            
            {/* Ventas */}
            <div className="product-sold-container">
              <p className="title-ventas">Ventas</p>
              <p className="product-sold">{product.totalSales}</p>
            </div>
            
            {/* Botón de añadir al carrito */}
            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.877 12.52c.054-.076.103-.157.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753c.044.082.093.162.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025c.293-.278.557-.584.789-.915l.673-.961Zm-14.916.425L12 18.667l6.04-5.722c.195-.185.371-.39.525-.61l.673-.961a.335.335 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002a3.975 3.975 0 0 0-1.237-2.574 4 4 0 0 0-6.031 5.193c.009.03.023.058.043.086l.673.961a4 4 0 0 0 .526.61Z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
