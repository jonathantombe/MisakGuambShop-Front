import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateResetToken, resetPassword } from '../../services/auth';
import "./ResetPassword.css";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Definimos isLoading
    const location = useLocation();
    const navigate = useNavigate();

    const [token, setToken] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlToken = searchParams.get('token');
        if (!urlToken) {
            setError('Token no válido');
            setIsLoading(false);
            return;
        }
        setToken(urlToken);

        const checkToken = async () => {
            try {
                await validateResetToken(urlToken);
                setIsLoading(false);
            } catch (error) {
                setError('El enlace de restablecimiento es inválido o ha expirado.');
                setIsLoading(false);
            }
        };
        checkToken();
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        if (!token) {
            setError('Token no válido o faltante.');
            return;
        }
        try {
            await resetPassword(token, password);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setError(error.message || 'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (isSuccess) {
        return (
            <div className="reset-password-container">
                <div className="success-message">
                    <p className="success-text">Tu contraseña ha sido restablecida exitosamente.</p>
                    <button onClick={() => navigate('/login')} className="ok-button">
                        IR AL INICIO DE SESIÓN
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-container">
            <h2 className="reset-password-title">Establece tu nueva contraseña</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirmar nueva contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">
                    RESTABLECER CONTRASEÑA
                </button>
            </form>
        </div>
    );
};

export default ResetPasswordForm;
