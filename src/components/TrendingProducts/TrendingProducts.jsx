import React from 'react';
import './TrendingProducts.css';

const TrendingProducts = ({ products }) => {
    return (
        <div className="trending-products-container">
            <h2 className="trending-products-title">Productos de tendencia</h2>
            <div className="trending-products-grid">
           
                <div className="trending-product-card-special-wrapper">
                    <div className="trending-product-card-special">
                        <div className="trending-offer-timer">
                            LA OFERTA TERMINA EN
                            <div className="trending-timer-boxes">
                                <div className="trending-timer-box">00</div>
                                <div className="trending-timer-box">00</div>
                                <div className="trending-timer-box">00</div>
                            </div>
                            <div className="trending-product-stats">
                                <span className="trending-quantity">Cantidad: {products[0]?.quantity || 0}</span>
                                <span className="trending-sold">Vendido: {products[0]?.sold || 0}</span>
                            </div>
                        </div>
                        <div className="trending-product-content-special">
                            <div className="trending-product-content">
                                <div className="trending-product-image-container">
                                    <img
                                        src={products[0]?.image || ''}
                                        alt={products[0]?.name || 'Producto'}
                                        className="trending-product-image"
                                    />
                                    <span className="trending-discount">{products[0]?.discount || 0}%</span>
                                    <button className="trending-favorite-btn">♥</button>
                                </div>
                                <div className="trending-product-info">
                                    <h3 className="trending-product-name">{products[0]?.name || 'Producto'}</h3>
                                    <div className="trending-rating">
                                        {"★".repeat(Math.floor(products[0]?.rating || 0))}
                                        <span className="trending-rating-count">({products[0]?.rating || 0})</span>
                                    </div>
                                    <div className="trending-price-info">
                                        <p className="trending-price">
                                            ${products[0]?.price?.toFixed(2) || '0.00'}
                                        </p>
                                        <p className="trending-discount-info">
                                            {products[0]?.discount || 0}%
                                        </p>
                                    </div>
                                    <p className="trending-sold-info">Vendidos: {products[0]?.sold || 0}</p>
                                    <p className="trending-shipping">Envío gratis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="trending-product-card-wrapper">
                    <div className="trending-product-card-container">
                        {products.slice(1, 4).map((product) => (
                            <div key={product.id} className="trending-product-card">
                                <div className="trending-product-content">
                                    <div className="trending-product-image-container">
                                        <img
                                            src={product.image || ''}
                                            alt={product.name || 'Producto'}
                                            className="trending-product-image-div"
                                        />
                                        <span className="trending-discount">{product.discount || 0}%</span>
                                        <button className="trending-favorite-btn">♥</button>
                                    </div>
                                    <div className="trending-product-info">
                                        <h3 className="trending-product-name">{product.name || 'Producto'}</h3>
                                        <div className="trending-rating">
                                            {"★".repeat(Math.floor(product.rating || 0))}
                                            <span className="trending-rating-count">({product.rating || 0})</span>
                                        </div>
                                        <div className="trending-price-info">
                                            <p className="trending-price">
                                                ${product.price?.toFixed(2) || '0.00'}
                                            </p>
                                            <p className="trending-discount-info">{product.discount || 0}%</p>
                                        </div>
                                        <p className="trending-sold-info">Vendidos: {product.sold || 0}</p>
                                        <p className="trending-shipping">Envío gratis</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="trending-product-card-container">
                        {products.slice(4, 7).map((product) => (
                            <div key={product.id} className="trending-product-card">
                                <div className="trending-product-content">
                                    <div className="trending-product-image-container">
                                        <img
                                            src={product.image || ''}
                                            alt={product.name || 'Producto'}
                                            className="trending-product-image-div"
                                        />
                                        <span className="trending-discount">{product.discount || 0}%</span>
                                        <button className="trending-favorite-btn">♥</button>
                                    </div>
                                    <div className="trending-product-info">
                                        <h3 className="trending-product-name">{product.name || 'Producto'}</h3>
                                        <div className="trending-rating">
                                            {"★".repeat(Math.floor(product.rating || 0))}
                                            <span className="trending-rating-count">({product.rating || 0})</span>
                                        </div>
                                        <div className="trending-price-info">
                                            <p className="trending-price">
                                                ${product.price?.toFixed(2) || '0.00'}
                                            </p>
                                            <p className="trending-discount-info">{product.discount || 0}%</p>
                                        </div>
                                        <div className="trending-sold-info-div">
                                            <p className="trending-sold-info">Vendidos: {product.sold || 0}</p>
                                            <p className="trending-total-sales-info">Total Ventas: ${product.totalSales?.toFixed(2) || '0.00'}</p>
                                        </div>
                                        <p className="trending-shipping">Envío gratis</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingProducts;
