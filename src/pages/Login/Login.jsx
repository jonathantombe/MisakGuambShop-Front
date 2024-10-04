import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '../../assets/images/isotipoblack.png';
import Footer from '../../components/Footer/Footer';
import { loginUser, reactivateAccount, forgotPassword } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import ResetPassword from '../../pages/ResetPassword/ResetPassword'; 

const Login = () => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [showResetPassword, setShowResetPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showReactivate, setShowReactivate] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setShowReactivate(false);

        try {
            const response = await loginUser(form);
            login({ ...response.user, email: form.email });
            navigate('/');
        } catch (error) {
            if (error.message.includes('desactivada')) {
                setError('Tu cuenta está desactivada. Para reactivarla, haz clic en el botón "Activar mi cuenta".');
                setShowReactivate(true);
            } else {
                setError(error.message || 'Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
            }
        }
    };

    const handleReactivate = async () => {
        try {
            console.log("Función de reactivación llamada");
            const user = JSON.parse(localStorage.getItem('user'));
            const email = user ? user.email : null;
            if (!email) {
                setError('No se pudo obtener el email del usuario. Por favor, intenta iniciar sesión de nuevo.');
                return;
            }
            console.log("Intentando reactivar cuenta para el email:", email);
            const response = await reactivateAccount(email);
            console.log("Respuesta de reactivación:", response);
            if (response && response.success) {
                setMessage(response.message || 'Tu cuenta ha sido reactivada exitosamente. Por favor, inicia sesión.');
                setShowReactivate(false);
            } else {
                setError('No se pudo reactivar la cuenta. Por favor, contacta al soporte.');
            }
        } catch (error) {
            console.error("Error en handleReactivate:", error);
            setError(error.message || 'Error al reactivar la cuenta. Por favor, intenta de nuevo o contacta al soporte.');
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            await forgotPassword(email);
            setMessage('Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
            setShowResetPassword(false);
        } catch (error) {
            setError(error.message || 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <div>
            <main>
                <div className="login-container">
                    <div className="welcome-container">
                        <h2 className='welcome-h2'>¡Bienvenido a MisakGuambShop!</h2>
                        <p className='welcome-p'>Inicia sesión para acceder a todas las funciones del sitio.</p>
                        <img src={isotipoblack} alt="Logo MisakGuambShop" />
                    </div>

                    <div className="login-box">
                        <h2 className="login-title">Iniciar Sesión</h2>

                        <div className="social-icons">
                            <button className='button-icons'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                                    
                                </svg>
                                <p className='p-icons'>Continuar con Google</p>
                            </button>
                            <button className='button-icons'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                                
                                </svg>
                                <p className='p-icons'>Continuar con Facebook</p>
                            </button>
                        </div>
                        {message && <p className="success-message">{message}</p>}
                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-row">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo Electrónico"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Contraseña"
                                        value={form.password}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <button type="submit" className="login-button">
                                    Iniciar Sesión
                                </button>
                                <div className='button-olvide-contrasena'>
                                <button type="button">
                                    <Link to="/forgot-password">
                                        Olvidé mi contraseña
                                    </Link>
                                    </button>
                                </div>

                            {showReactivate && (
                                <button type="button" onClick={handleReactivate} className="reactivate-button">
                                    Reactivar mi cuenta
                                </button>
                            )}

                                <p className="login-footer">
                                    Al iniciar sesión, aceptas nuestras <Link to="/terms" className="custom-link">Condiciones de uso</Link> y <Link to="/privacy" className="custom-link">Política de privacidad</Link>.
                                </p>
                            </form>

                        <p className="login-footer">
                            ¿No tienes una cuenta? <Link to="/register" className='custom-link'>Regístrate</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
            {showResetPassword && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <ResetPassword
                            onBack={() => setShowResetPassword(false)}
                            onSubmit={handleForgotPassword}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;