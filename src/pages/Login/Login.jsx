import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted', form);
    };

    return (
        <div className="login-container">
            <div className="welcome-container">
                <h2>¡Bienvenido a MisakGuambShop!</h2>
                <p>Inicia sesión para acceder a todas las funciones del sitio.</p>
            </div>

            <div className="login-box">
                <h2 className="login-title">Iniciar Sesión</h2>

                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-tiktok"></i>
                </div>

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
    );
};

export default Login;
