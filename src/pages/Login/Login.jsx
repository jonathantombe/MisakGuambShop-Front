import React from 'react';
import './Login.css'; // Archivo CSS para estilos

const Login = () => {
    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" placeholder="Ingresa tu correo electrónico" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingresa tu contraseña" required />
                </div>
                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
