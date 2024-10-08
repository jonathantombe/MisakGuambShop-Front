import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import isotipoblack from '../../assets/images/isotipoblack.png';
import { registerUser, loginUser } from '../../services/auth';
import Footer from '../../components/Footer/Footer'
import './Register.css';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        let tempErrors = {};
        // Validación del nombre de usuario
        if (!form.username.trim()) {
            tempErrors.username = "El nombre de usuario es requerido";
        } else if (form.username.length < 3 || form.username.length > 20) {
            tempErrors.username = "El nombre de usuario debe tener entre 3 y 20 caracteres";
        } else if (!/^[a-zA-Z0-9 ]+$/.test(form.username)) {
            tempErrors.username = "El nombre de usuario solo puede contener letras y números";
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
                const registerResponse = await registerUser({
                    username: form.username,
                    email: form.email,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    phone: form.phone
                });

                setSuccess(registerResponse.message || 'Registro exitoso');

                try {
                    const loginResponse = await loginUser({
                        email: form.email,
                        password: form.password
                    });
                    if (loginResponse && loginResponse.accessToken) {
                        login({
                            ...loginResponse.user,
                            username: form.username,
                            email: form.email,
                            phone: form.phone
                        });
                        navigate('/');
                    } else {
                        throw new Error('Login failed: No access token received');
                    }
                } catch (loginError) {
                    console.error('Error logging in automatically:', loginError);
                    setErrors({ submit: 'Registration successful, but there was a problem logging in. Please try logging in manually.' });
                    navigate('/login');
                }
            } catch (error) {
                if (error.message.includes('nombre de usuario')) {
                    setErrors(prevErrors => ({ ...prevErrors, username: 'El nombre de usuario ya está en uso' }));
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
        <div className="register-container">
            <div className="welcome-container">
                <h2 className='welcome-h2'>¡Bienvenido a MisakGuambShop!</h2>
                <p className='welcome-p'>Regístrate con tus datos personales para usar todas las funciones del sitio.</p>
                <img src={isotipoblack} alt="Isotipo Black" />
            </div>

            <div className="register-box">
                <h2 className="register-title">Regístrate</h2>

                <div className="social-icons">
                    <button className='button-icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <path d="M15.68,8.18181818 C15.68,7.61454546 15.6290909,7.06909091 15.5345454,6.54545454 L8,6.54545454 L8,9.64 L12.3054546,9.64 C12.12,10.64 11.5563636,11.4872727 10.7090909,12.0545454 L10.7090909,14.0618182 L13.2945454,14.0618182 C14.8072727,12.6690909 15.68,10.6181818 15.68,8.18181818 L15.68,8.18181818 Z" id="Shape" fill="#4285F4" fillRule="nonzero"></path>
                                <path d="M8,16 C10.16,16 11.9709091,15.2836364 13.2945454,14.0618182 L10.7090909,12.0545454 C9.99272729,12.5345454 9.07636364,12.8181818 8,12.8181818 C5.91636364,12.8181818 4.15272727,11.4109091 3.52363636,9.52 L0.850909091,9.52 L0.850909091,11.5927273 C2.16727273,14.2072727 4.87272727,16 8,16 L8,16 Z" id="Shape" fill="#34A853" fillRule="nonzero"></path>
                                <path d="M3.52363636,9.52 C3.36363636,9.04 3.27272727,8.52727273 3.27272727,8 C3.27272727,7.47272727 3.36363636,6.96 3.52363636,6.48 L3.52363636,4.40727273 L0.850909091,4.40727273 C0.309090909,5.48727273 0,6.70909091 0,8 C0,9.29090907 0.309090909,10.5127273 0.850909091,11.5927273 L3.52363636,9.52 L3.52363636,9.52 Z" id="Shape" fill="#FBBC05" fillRule="nonzero"></path>
                                <path d="M8,3.18181818 C9.17454542,3.18181818 10.2290909,3.58545454 11.0581818,4.37818182 L13.3527273,2.08363636 C11.9672727,0.792727273 10.1563636,0 8,0 C4.87272727,0 2.16727273,1.79272727 0.850909091,4.40727273 L3.52363636,6.48 C4.15272727,4.58909091 5.91636364,3.18181818 8,3.18181818 L8,3.18181818 Z" id="Shape" fill="#EA4335" fillRule="nonzero"></path>
                                <polygon id="Shape" points="0 0 16 0 16 16 0 16"></polygon>
                            </g>
                        </svg>
                        <p className='p-icons'>Continuar con Google</p>
                    </button>
                    <button className='button-icons'>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16px" height="16px" viewBox="0 0 16 16" version="1.1" aria-hidden="true" focusable="false">
                            <path d="M15.0784247,15.9571892 C15.5636139,15.9571892 15.9570656,15.5637375 15.9570656,15.0784247 L15.9570656,0.915027027 C15.9570656,0.42965251 15.5636757,0.0363243243 15.0784247,0.0363243243 L0.915027027,0.0363243243 C0.42965251,0.0363243243 0.0363243243,0.42965251 0.0363243243,0.915027027 L0.0363243243,15.0784247 C0.0363243243,15.5636757 0.429590734,15.9571892 0.915027027,15.9571892 L15.0784247,15.9571892 Z" id="Blue_1_" fill="#3C5A99"></path>
                            <path d="M11.0214054,15.9571892 L11.0214054,9.7917529 L13.0908417,9.7917529 L13.4007104,7.38897297 L11.0214054,7.38897297 L11.0214054,5.85494981 C11.0214054,5.15928958 11.2145792,4.68522008 12.212139,4.68522008 L13.4844788,4.68466409 L13.4844788,2.53559846 C13.2644324,2.5063166 12.5091583,2.44089575 11.6304556,2.44089575 C9.79601544,2.44089575 8.54010811,3.56064865 8.54010811,5.61698842 L8.54010811,7.38897297 L6.46535907,7.38897297 L6.46535907,9.7917529 L8.54010811,9.7917529 L8.54010811,15.9571892 L11.0214054,15.9571892 Z" id="f" fill="#FFFFFF"></path>
                        </svg>
                        <p className='p-icons'>Continuar con Facebook</p>
                    </button>
                </div>

                {errors.submit && <p className="error-message">{errors.submit}</p>}
                {success && <p className="success-message">{success}</p>}

                <form onSubmit={handleSubmit} className="register-form" noValidate>
                    <div className="form-row">
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre Completo"
                            value={form.username}
                            onChange={handleChange}
                            className={`form-input ${errors.username ? 'error' : ''}`}
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}
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
                        Regístrate
                    </button>

                    <p className="register-footer">
                        Al registrarte, aceptas nuestras <Link to="/terms" className="custom-link">Condiciones de uso</Link> y <Link to="/privacy" className="custom-link">Política de privacidad</Link>.
                    </p>
                </form>

                {errors.submit && errors.submit.includes('ya está en uso') && (
                    <div>
                        <p>{errors.submit}</p>
                        <Link to="/login" className="btn btn-primary">
                            Ir a Iniciar Sesión
                        </Link>
                    </div>
                )}

                <p className="register-footer">
                    ¿Ya tienes una cuenta? <Link to="/login" className='custom-link'>Iniciar sesión</Link>
                </p>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;