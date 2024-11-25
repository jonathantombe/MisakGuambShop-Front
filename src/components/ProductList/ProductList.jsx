import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ProductList.css';

const ProductList = ({ title, products = [], onError }) => {
    const navigate = useNavigate();

    const validateProduct = (product) => {
        return (
            product &&
            typeof product === 'object' &&
            product.id &&
            product.name &&
            product.imageUrls &&
            typeof product.price === 'number' &&
            product.price >= 0
        );
    };

    const formatPrice = (price) => {
        try {
            if (typeof price !== 'number') return '0';
            // Formatea el precio sin decimales y con separador de miles
            return price.toLocaleString('es-CO', {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0
            });
        } catch (error) {
            console.error('Error al formatear precio:', error);
            return '0';
        }
    };


    const addToCart = (product) => {
        try {
            if (!validateProduct(product)) {
                throw new Error('Producto inválido para agregar al carrito');
            }

            let cart = [];
            try {
                cart = JSON.parse(localStorage.getItem('cart')) || [];
            } catch (error) {
                console.error('Error al leer el carrito del localStorage:', error);
                cart = [];
            }

            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            navigate('/shopping/cart');
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            onError && onError(error);
        }
    };

    // Filtrar productos válidos
    const validProducts = products.filter(validateProduct);

    if (!validProducts || validProducts.length === 0) {
        return (
            <div className="product-list-container">
                <h2 className="product-list-title">{title}</h2>
                <div className="no-products-message">
                    No hay productos disponibles en este momento.
                </div>
            </div>
        );
    }

    console.log(validProducts);
    

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">{title}</h2>
            <div className="product-list">
                {validProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img 
                            src={product?.imageUrls[0] || '/placeholder-image.png'} 
                            alt={product.name} 
                            className="product-image" 
                        />
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating-container">
                            <div className="product-rating">
                                {[...Array(5)].map((_, i) => (
                                    <span 
                                        key={i} 
                                        className={i < (product.rating || 0) ? 'star filled' : 'star'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <p className="product-rating-value">
                                {product.rating ? product.rating.toFixed(2) : 'Sin calificación'}
                            </p>
                        </div>
                        <div className="product-price-container">
                            <p className="product-price">
                                COP {formatPrice(product.price)}
                            </p>
                            {product.discount > 0 && (
                                <p className="product-discount">${formatPrice(product.discount)}</p>
                            )}
                        </div>
                        <div className="product-sold-container">
                            <p className="title-ventas">Ventas</p>
                            <p className="product-sold">{product.totalSales || 0}</p>
                        </div>
                        <div className="product-actions">
                            <button 
                                className="add-to-cart-button cart"
                                aria-label="Agregar al carrito"
                                onClick={() => addToCart(product)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1"/>
                                    <circle cx="20" cy="21" r="1"/>
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ProductList.propTypes = {
    title: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            imageUrls: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number,
            discount: PropTypes.number,
            totalSales: PropTypes.number
        })
    ),
    onError: PropTypes.func
};

export default ProductList;