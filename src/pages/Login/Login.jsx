import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '../../assets/images/isotipoblack.png';
import Footer from '../../components/Footer/Footer';
import api from '../../services/api';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
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

        try {
            const response = await api.post('/api/auth/login', form);

            console.log('Respuesta del servidor:', response); // Para depuración

            if (response.accessToken) {
                // Guardar el token en el localStorage
                localStorage.setItem('token', response.accessToken);
                // Redirigir al usuario a la página principal o dashboard
                navigate('/dashboard');
            } else {
                setError('Inicio de sesión fallido. Por favor, intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error durante el inicio de sesión:', error);
            setError(error.message || 'Hubo un error al iniciar sesión. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div>
            <header>
                {/* Aquí iría el contenido del encabezado */}
            </header>
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <path d="M15.68,8.18181818 C15.68,7.61454546 15.6290909,7.06909091 15.5345454,6.54545454 L8,6.54545454 L8,9.64 L12.3054546,9.64 C12.12,10.64 11.5563636,11.4872727 10.7090909,12.0545454 L10.7090909,14.0618182 L13.2945454,14.0618182 C14.8072727,12.6690909 15.68,10.6181818 15.68,8.18181818 L15.68,8.18181818 Z" id="Shape" fill="#4285F4" fill-rule="nonzero"></path>
                                        <path d="M8,16 C10.16,16 11.9709091,15.2836364 13.2945454,14.0618182 L10.7090909,12.0545454 C9.99272729,12.5345454 9.07636364,12.8181818 8,12.8181818 C5.91636364,12.8181818 4.15272727,11.4109091 3.52363636,9.52 L0.850909091,9.52 L0.850909091,11.5927273 C2.16727273,14.2072727 4.87272727,16 8,16 L8,16 Z" id="Shape" fill="#34A853" fill-rule="nonzero"></path>
                                        <path d="M3.52363636,9.52 C3.36363636,9.04 3.27272727,8.52727273 3.27272727,8 C3.27272727,7.47272727 3.36363636,6.96 3.52363636,6.48 L3.52363636,4.40727273 L0.850909091,4.40727273 C0.309090909,5.48727273 0,6.70909091 0,8 C0,9.29090907 0.309090909,10.5127273 0.850909091,11.5927273 L3.52363636,9.52 L3.52363636,9.52 Z" id="Shape" fill="#FBBC05" fill-rule="nonzero"></path>
                                        <path d="M8,3.18181818 C9.17454542,3.18181818 10.2290909,3.58545454 11.0581818,4.37818182 L13.3527273,2.08363636 C11.9672727,0.792727273 10.1563636,0 8,0 C4.87272727,0 2.16727273,1.79272727 0.850909091,4.40727273 L3.52363636,6.48 C4.15272727,4.58909091 5.91636364,3.18181818 8,3.18181818 L8,3.18181818 Z" id="Shape" fill="#EA4335" fill-rule="nonzero"></path>
                                        <polygon id="Shape" points="0 0 16 0 16 16 0 16"></polygon>
                                    </g>
                                </svg>
                                <p className='p-icons'>Continuar con Google</p>
                            </button>
                            <button className='button-icons'>
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                                    <path d="M15.0784247,15.9571892 C15.5636139,15.9571892 15.9570656,15.5637375 15.9570656,15.0784247 L15.9570656,0.915027027 C15.9570656,0.42965251 15.5636757,0.0363243243 15.0784247,0.0363243243 L0.915027027,0.0363243243 C0.42965251,0.0363243243 0.0363243243,0.42965251 0.0363243243,0.915027027 L0.0363243243,15.0784247 C0.0363243243,15.5636757 0.429590734,15.9571892 0.915027027,15.9571892 L15.0784247,15.9571892 Z" id="Blue_1_" fill="#3C5A99"></path>
                                    <path d="M11.0214054,15.9571892 L11.0214054,9.7917529 L13.0908417,9.7917529 L13.4007104,7.38897297 L11.0214054,7.38897297 L11.0214054,5.85494981 C11.0214054,5.15928958 11.2145792,4.68522008 12.212139,4.68522008 L13.4844788,4.68466409 L13.4844788,2.53559846 C13.2644324,2.5063166 12.5091583,2.44089575 11.6304556,2.44089575 C9.79601544,2.44089575 8.54010811,3.56064865 8.54010811,5.61698842 L8.54010811,7.38897297 L6.46535907,7.38897297 L6.46535907,9.7917529 L8.54010811,9.7917529 L8.54010811,15.9571892 L11.0214054,15.9571892 Z" id="f" fill="#FFFFFF"></path>
                                </svg>
                                <p className='p-icons'>Continuar con Facebook</p>
                            </button>
                        </div>

                        {error && <p className="error-message">{error}</p>}

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
        </div>
    );
};

export default Login;
