import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Success.css';

const Success = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');

        // Aquí puedes hacer una llamada a tu backend para verificar el estado del pago
        const verifyPayment = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/payments/verify/${sessionId}`);
                const data = await response.json();

                if (!data.success) {
                    navigate('/payment/cancel');
                }
            } catch (error) {
                console.error('Error al verificar el pago:', error);
                navigate('/payment/cancel');
            }
        };

        if (sessionId) {
            verifyPayment();
        }

        // Contador para redirección
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/'); // O la ruta que prefieras
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, searchParams]);

    return (
        <div className="payment-success-container">
            <div className="payment-success-content">
                <div className="success-icon">✓</div>
                <h1>¡Pago Exitoso!</h1>
                <p>Gracias por tu compra en MisakGuamboShop</p>
                <p>Hemos enviado un correo electrónico con los detalles de tu compra.</p>
                <p className="redirect-message">
                    Serás redirigido a la página principal en {countdown} segundos...
                </p>
                <button
                    className="home-button"
                    onClick={() => navigate('/')}
                >
                    Volver a la página principal
                </button>
            </div>
        </div>
    );
};

export default Success;