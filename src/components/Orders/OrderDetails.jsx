import React from 'react';
import { X } from 'lucide-react';
import EpaycoCheckout from '../Payment/EpaycoCheckout/EpaycoCheckout';
import './OrderDetails.css'

const OrderDetails = ({ isOpen, onClose, cartItems, totalPrice, orderData }) => {
    if (!isOpen) return null;

    return (
        <div className="order-review-modal-overlay">
            <div className="order-review-modal">
                <div className="order-review-header">
                    <h2>Resumen del Pedido</h2>
                    <button onClick={onClose} className="close-button">
                        <X size={24} />
                    </button>
                </div>

                <div className="order-review-content">
                    <div className="products-section">
                        <h3>Productos</h3>
                        {cartItems.map((item) => (
                            <div key={item.id} className="product-item">
                                <div className="product-info">
                                    <img src={item.image} alt={item.name} />
                                    <div className="product-details">
                                        <p className="product-name">{item.name}</p>
                                        <p className="product-quantity">Cantidad: {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="product-price">COP {(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <div className="order-total">
                        <span>Total a Pagar:</span>
                        <span>COP {totalPrice.toLocaleString()}</span>
                    </div>

                    <div className="payment-section">
                        <EpaycoCheckout orderData={orderData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;