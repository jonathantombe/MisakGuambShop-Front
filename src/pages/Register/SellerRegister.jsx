import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '/src/assets/images/isotipoblack.png';
import { registerSeller, loginUser } from '../../services/auth';
import Footer from '../../components/Footer/Footer'
import './SellerRegister.css';
import { useAuth } from '../../context/AuthContext';

const SellerRegister = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        companyName: '',
        description: '',
        city: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = '36px';
            const scrollHeight = textareaRef.current.scrollHeight;
            const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight);
            const maxHeight = lineHeight * 6;

            if (scrollHeight > maxHeight) {
                textareaRef.current.style.height = `${maxHeight}px`;
                textareaRef.current.style.overflowY = 'auto';
            } else {
                textareaRef.current.style.height = `${scrollHeight}px`;
                textareaRef.current.style.overflowY = 'hidden';
            }
        }
    }, [form.description]);

    const validateForm = () => {
        let tempErrors = {};

        // Validación del nombre completo
        if (!form.fullName.trim()) {
            tempErrors.fullName = "El nombre completo es requerido";
        } else if (form.fullName.length < 3 || form.fullName.length > 20) {
            tempErrors.fullName = "El nombre completo debe tener entre 3 y 20 caracteres";
        } else if (!/^[a-zA-Z0-9 ]+$/.test(form.fullName)) {
            tempErrors.fullName = "El nombre completo solo puede contener letras y números";
        }

        // Validación del correo electrónico
        if (!form.email.trim()) {
            tempErrors.email = "El correo electrónico es requerido";
        } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(form.email)) {
            tempErrors.email = "El correo electrónico debe estar en minúsculas y tener un formato válido";
        }

        // Validación de la contraseña
        if (!form.password) {
            tempErrors.password = "La contraseña es requerida";
        } else if (form.password.length < 8 || form.password.length > 20) {
            tempErrors.password = "La contraseña debe tener entre 8 y 20 caracteres";
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
            tempErrors.password = "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial";
        }

        // Validación de la confirmación de la contraseña
        if (form.password !== form.confirmPassword) {
            tempErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        // Validación del número de teléfono
        if (!form.phone.trim()) {
            tempErrors.phone = "El número de teléfono es requerido";
        } else if (!/^\d{10}$/.test(form.phone)) {
            tempErrors.phone = "El número de teléfono debe tener exactamente 10 dígitos";
        }

        // Validación del nombre de la empresa
        if (!form.companyName.trim()) {
            tempErrors.companyName = "El nombre de la empresa es requerido";
        } else if (form.companyName.length < 3 || form.companyName.length > 100) {
            tempErrors.companyName = "El nombre de la empresa debe tener entre 3 y 100 caracteres";
        } else if (!/^[a-zA-Z0-9 ]+$/.test(form.companyName)) {
            tempErrors.companyName = "El nombre de la empresa solo puede contener letras, números y espacios";
        }
        
        // Validación de la descripción (opcional)
        if (form.description.trim().length > 500) {
            tempErrors.description = "La descripción no debe exceder los 500 caracteres";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,;:()'-]+$/.test(form.description) && form.description.trim().length > 0) {
            tempErrors.description = "La descripción contiene caracteres no permitidos";
        }

        // Validación de la ciudad
        if (!form.city.trim()) {
            tempErrors.city = "La ciudad es requerida";
        } else if (form.city.length > 50) {
            tempErrors.city = "El nombre de la ciudad no debe exceder los 50 caracteres";
        } else if (!/^[a-zA-Z ]+$/.test(form.city)) {
            tempErrors.city = "El nombre de la ciudad solo puede contener letras y espacios";
        }

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
                        login({
                            ...loginResponse.user,
                            fullName: form.fullName,
                            email: form.email,
                            phone: form.phone,
                            companyName: form.companyName,
                            description: form.description,
                            city: form.city,



                        });
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
                if (error.message.includes('nombre de usuario')) {
                    setErrors(prevErrors => ({ ...prevErrors, fullName: 'El nombre de usuario ya está en uso' }));
                } else if (error.message.includes('correo electrónico')) {
                    setErrors(prevErrors => ({ ...prevErrors, email: 'El correo electrónico ya está en uso' }));
                } else {
                    setErrors({ submit: error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' });
                }
            }
        }
    };

    return (
        <>
            <div className="seller-register-container">
                <div className="welcome-container">
                    <h2 className='welcome-p'>¡Bienvenido a MisakGuambShop!</h2>
                    <p className='welcome-pp'>Regístrate como vendedor para comenzar a ofrecer tus productos.</p>
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
                        <div className="form-row">
                            <textarea
                                ref={textareaRef}
                                name="description"
                                placeholder="Descripción de la Empresa (opcional)"
                                value={form.description}
                                onChange={handleChange}
                                className={`form-input auto-grow-textarea ${errors.description ? 'error' : ''}`}
                            />
                            {errors.description && <p className="error-message">{errors.description}</p>}
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
            <Footer />
        </>
    );
};

export default SellerRegister;