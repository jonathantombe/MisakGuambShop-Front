import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateResetToken, resetPassword } from '../../services/auth';
import "./ResetPasswordForm.css";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

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

        // Validate password
        if (!password.trim()) {
            setError('La contraseña es requerida');
            return;
        }
        if (password.length < 8 || password.length > 20) {
            setError('La contraseña debe tener entre 8 y 20 caracteres');
            return;
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            setError('La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial');
            return;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await resetPassword(token, password);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error al restablecer la contraseña:', error);
            setError(error.message || 'Error al restablecer la contraseña. Por favor, inténtalo de nuevo.');
        }
    };

    if (isSuccess) {
        return (
            <div className="reset-password-container-c">
                <div className="success-messages">
                    <p className="success-text">Tu contraseña ha sido restablecida exitosamente.</p>
                    <svg class="success-popup__icon" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><circle stroke="#6C0" stroke-width="2" cx="26" cy="26" r="26"></circle><path d="M25.8 35.098l13.563-13.835c.91-.91.836-2.46-.165-3.46-1-1.002-2.55-1.076-3.46-.166L23.77 29.84l-7.51-6.763c-.91-.91-2.46-.836-3.46.165-1 1-1.075 2.55-.165 3.46l9.61 8.657c.91.91 2.46.835 3.46-.166.03-.03.062-.063.092-.096z" fill="#6C0"></path></g></svg>
                    <div className='container-button'>
                        <button onClick={() => navigate('/login')} className="proceed-button">
                            IR AL INICIO DE SESIÓN
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="reset-password-container">
            <div className='reset-password-container-v'>
                <h2 className="title-set-your-new-password">Establece tu nueva contraseña</h2>
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
                            className={`form-input ${error && error.includes('contraseña') ? 'is-invalid' : ''}`}
                            required
                            placeholder="Ingresa tu nueva contraseña"
                        />
                        {error && error.includes('contraseña') && (
                            <div className="error-message">{error}</div>
                        )}
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
                            className={`form-input ${error && error.includes('coinciden') ? 'is-invalid' : ''}`}
                            placeholder="Confirma tu nueva contraseña"
                        />
                        {error && error.includes('coinciden') && (
                            <div className="error-message">{error}</div>
                        )}
                    </div>

                    <button type="submit" className="submit-button">
                        RESTABLECER CONTRASEÑA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;