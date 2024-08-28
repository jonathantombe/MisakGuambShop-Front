import React, { useState } from 'react';
import './Register.css'; 

const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', form);
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">Regístrate</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-row">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nombre y Apellidos"
                            value={form.fullName}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Número Telefónico"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo Electrónico"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <button type="submit" className="register-button">
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
