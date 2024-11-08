import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';


const ProductList = ({ title,products}) => {
    console.log(products)
    const navigate = useNavigate();

    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">{title}</h2>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.imageUrls} alt={product.name} className="product-image" />
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating-container">
                            <div className="product-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < product.rating ? 'star filled' : 'star'}>★</span>
                                ))}
                            </div>
                            <p className="product-rating-value">{product?.rating?.toFixed(2)}</p>
                        </div>
                        <div className="product-price-container">
                            <p className="product-price">${product.price.toFixed(2)}</p>
                            {product.discount && (
                                <p className="product-discount">${product.discount}</p>
                            )}
                        </div>
                        <div className="product-sold-container">
                            <p className="title-ventas">Ventas</p>
                            <p className="product-sold">{product.totalSales}</p>
                        </div>
                        <div className="product-actions">
                            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.877 12.52c.054-.076.103-.157.147-.239A6 6 0 0 0 12 4.528a6 6 0 0 0-9.024 7.753c.044.082.093.162.147.24l.673.961a6 6 0 0 0 .789.915L12 21.422l7.415-7.025c.293-.278.557-.584.789-.915l.673-.961Zm-14.916.425L12 18.667l6.04-5.722c.195-.185.371-.39.525-.61l.673-.961a.335.335 0 0 0 .044-.087 4 4 0 1 0-7.268-2.619v.003L12 8.667l-.013.004v-.002a3.975 3.975 0 0 0-1.237-2.574 4 4 0 0 0-6.031 5.193c.009.03.023.058.043.086l.673.961a4 4 0 0 0 .526.61Z"></path>
                                </svg>
                            </button>
                            <button className="add-to-cart-button" onClick={() => addToCart(product)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"></circle>
                                    <circle cx="20" cy="21" r="1"></circle>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
