import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '/src/assets/images/isotipoblack.png';
import { registerSeller, loginUser } from '../../services/auth';
import './SellerRegister.css';
import { useAuth } from '../../context/AuthContext';

const SellerRegister = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        companyName: '',
        description: '',
        city: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        let tempErrors = {};
        if (!form.fullName.trim()) tempErrors.fullName = "El nombre completo es requerido";
        if (!form.email.trim()) tempErrors.email = "El correo electrónico es requerido";
        else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email)) {
            tempErrors.email = "El correo electrónico debe estar en minúsculas y tener un formato válido";
        }
        if (!form.password) tempErrors.password = "La contraseña es requerida";
        else if (form.password.length < 6 || form.password.length > 12) {
            tempErrors.password = "La contraseña debe tener entre 6 y 12 caracteres";
        }
        if (form.password !== form.confirmPassword) {
            tempErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        if (!form.phone.trim()) tempErrors.phone = "El número de teléfono es requerido";
        if (!form.companyName.trim()) tempErrors.companyName = "El nombre de la empresa es requerido";
        if (!form.city.trim()) tempErrors.city = "La ciudad es requerida";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: name === 'email' ? value.toLowerCase() : value
        }));
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');
        if (validateForm()) {
            try {
                const registerResponse = await registerSeller(form);
                setSuccess(registerResponse.message || 'Registro exitoso');

                try {
                    const loginResponse = await loginUser({
                        email: form.email,
                        password: form.password
                    });
                    if (loginResponse && loginResponse.accessToken) {
                        login(loginResponse.user);
                        navigate('/seller-dashboard');
                    } else {
                        throw new Error('Login failed: No access token received');
                    }
                } catch (loginError) {
                    console.error('Error logging in automatically:', loginError);
                    setErrors({ submit: 'Registro exitoso, pero hubo un problema al iniciar sesión. Por favor, intente iniciar sesión manualmente.' });
                    navigate('/login');
                }
            } catch (error) {
                setErrors({ submit: error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' });
            }
        }
    };

    return (
        <div className="seller-register-container">
            <div className="welcome-container">
                <h2 className='welcome-h2'>¡Bienvenido a MisakGuambShop!</h2>
                <p className='welcome-p'>Regístrate como vendedor para comenzar a ofrecer tus productos.</p>
                <img src={isotipoblack} alt="Isotipo Black" />
            </div>

            <div className="register-box">
                <h2 className="register-title">Registro de Vendedor</h2>

                {errors.submit && <p className="error-message">{errors.submit}</p>}
                {success && <p className="success-message">{success}</p>}   

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    <div className="form-row">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Nombre Completo"
                            value={form.fullName}
                            onChange={handleChange}
                            className={`form-input ${errors.fullName ? 'error' : ''}`}
                        />
                        {errors.fullName && <p className="error-message">{errors.fullName}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={form.email}
                            onChange={handleChange}
                            className={`form-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            className={`form-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Número de Teléfono"
                            value={form.phone}
                            onChange={handleChange}
                            className={`form-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Nombre de la Empresa"
                            value={form.companyName}
                            onChange={handleChange}
                            className={`form-input ${errors.companyName ? 'error' : ''}`}
                        />
                        {errors.companyName && <p className="error-message">{errors.companyName}</p>}
                    </div>
                    <div className="form-row">
                        <textarea
                            name="description"
                            placeholder="Descripción de la Empresa (opcional)"
                            value={form.description}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                    <div className="form-row">
                        <input
                            type="text"
                            name="city"
                            placeholder="Ciudad"
                            value={form.city}
                            onChange={handleChange}
                            className={`form-input ${errors.city ? 'error' : ''}`}
                        />
                        {errors.city && <p className="error-message">{errors.city}</p>}
                    </div>
                    <button type="submit" className="register-button">
                        Registrarse como Vendedor
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

export default SellerRegister;
        