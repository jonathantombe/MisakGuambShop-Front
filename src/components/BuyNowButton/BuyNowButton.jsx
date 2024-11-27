import React, { useState } from 'react';
import EpaycoCheckout from '../Payment/EpaycoCheckout/EpaycoCheckout';
import './BuyNowButton.css';

const BuyNowButton = () => {
    const [showCheckout, setShowCheckout] = useState(false);

    // Datos de prueba para la orden
    const testOrderData = {
        orderId: 'TEST-' + Math.floor(Math.random() * 1000000),
        total: 50000, // Monto de prueba: 50,000 COP
        shippingAddress: 'Dirección de prueba',
        phone: '1234567890'
    };

    return (
        <div className="buy-now-container">
            <button
                onClick={() => setShowCheckout(true)}
                className="buy-now-button"
            >
                Comprar Ahora
            </button>

            {showCheckout && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Finalizar Compra</h2>
                            <button
                                onClick={() => setShowCheckout(false)}
                                className="close-button"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="price-container">
                            <p className="price-label">Total a pagar:</p>
                            <p className="price-amount">${testOrderData.total.toLocaleString()} COP</p>
                        </div>
                        <EpaycoCheckout orderData={testOrderData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyNowButton;