import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../services/api';
import './Register.css';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roles: ['user']
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleChange = (e) => {
        if (e.target.name === 'roles') {

            setForm({ ...form, roles: [e.target.value] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.post('/api/auth/signup', {
                username: form.username,
                email: form.email,
                password: form.password,
                roles: form.roles
            });

            if (response.status === 201 || response.status === 200) {
                setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión.');
                setForm({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    roles: ['user']
                });
                setError('');
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
            if (error.response) {
                setError(`Error: ${error.response.data.message || error.response.data || 'Hubo un error al registrarse'}`);
            } else if (error.request) {
                setError('No se pudo conectar con el servidor. Por favor, inténtalo de nuevo más tarde.');
            } else {
                setError('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
            }
        }
    };

    return (
        <div className="register-container">
            <div className="welcome-container">
                <h2>¡Bienvenido a MisakGuambShop!</h2>
                <p>Regístrate con tus datos personales para usar todas las funciones del sitio.</p>
            </div>

            <div className="register-box">
                <h2 className="register-title">Regístrate</h2>

                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-tiktok"></i>
                </div>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-row">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre Completo"
                            value={form.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
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
                    <div className="form-row">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <select
                            name="roles"
                            value={form.roles[0]}
                            onChange={handleChange}
                            className="select-options"
                            required
                        >
                            <option value="user">Usuario</option>
                            <option value="seller">Vendedor</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                    <button type="submit" className="register-button">
                        Regístrate
                    </button>

                    <p className="register-footer">
                        Al registrarte, aceptas nuestras <Link to="/terms" className="custom-link">Condiciones de uso</Link> y <Link to="/privacy" className="custom-link">Política de privacidad</Link>.
                    </p>
                </form>

                <p className="register-footer">
                    ¿Ya tienes una cuenta? <Link to="/login" className='custom-link'>Iniciar sesión</Link>
                </p>
            </div>
        </div>
    );
};



export default Register;


