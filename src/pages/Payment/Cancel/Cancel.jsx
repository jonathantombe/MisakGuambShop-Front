import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cancel.css';

const Cancel = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/checkout'); // O la ruta que prefieras
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="payment-cancel-container">
            <div className="payment-cancel-content">
                <div className="cancel-icon">×</div>
                <h1>Pago Cancelado</h1>
                <p>El proceso de pago ha sido cancelado o ha ocurrido un error.</p>
                <p>No te preocupes, no se ha realizado ningún cargo a tu tarjeta.</p>
                <p className="redirect-message">
                    Serás redirigido al checkout en {countdown} segundos...
                </p>
                <div className="cancel-buttons">
                    <button
                        className="retry-button"
                        onClick={() => navigate('/checkout')}
                    >
                        Intentar nuevamente
                    </button>
                    <button
                        className="home-button"
                        onClick={() => navigate('/')}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;