import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { paymentIntentId, amount, status } = location.state || {};

    useEffect(() => {
        const confirmPayment = async () => {
            if (!paymentIntentId) {
                setError('No se encontró información del pago');
                setTimeout(() => navigate('/payment/cancel'), 3000);
                return;
            }

            if (isProcessing) return; // Prevenir múltiples llamadas

            try {
                setIsProcessing(true);
                const response = await fetch('http://localhost:8080/api/payments/confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentIntentId,
                        amount,
                        status
                    }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Error al confirmar el pago');
                }

                const data = await response.json();
                if (data.status === 'succeeded') {
                    setTimeout(() => navigate('/payment/success'), 2000);
                } else {
                    throw new Error('El pago no pudo ser confirmado');
                }
            } catch (err) {
                setError(err.message);
                setTimeout(() => navigate('/payment/cancel'), 3000);
            } finally {
                setLoading(false);
                setIsProcessing(false);
            }
        };

        confirmPayment();
    }, [paymentIntentId, amount, status, navigate, isProcessing]);

    if (loading) {
        return (
            <div className="payment-confirmation-container">
                <div className="loading-spinner"></div>
                <p>Confirmando tu pago...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="payment-confirmation-container error">
                <p>{error}</p>
                <p>Redirigiendo...</p>
            </div>
        );
    }

    return (
        <div className="payment-confirmation-container">
            <p>Pago confirmado exitosamente</p>
            <p>Redirigiendo...</p>
        </div>
    );
};

export default PaymentConfirmation;