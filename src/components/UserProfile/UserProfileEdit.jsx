import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateUserProfile, deleteProfileImage, uploadProfileImage, deactivateUserAccount } from '../../services/auth';
import './UserProfileEdit.css';



const UserProfileEdit = () => {
    const navigate = useNavigate();
    const { user, updateUser, logout } = useAuth();
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        phone: '',
        is_active: true,
        
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || '',
                email: user.email || '',
                phone: user.phone || '',
                is_active: user.is_active || true,
            });
            setImagePreview(user.profileImageUrl || '');
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'is_active' && value === 'false') {
            setShowConfirmDialog(true);
        } else {
            setProfileData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                setError('El archivo es demasiado grande. El tamaño máximo es 1MB.');
                return;
            }
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);

                console.log('User ID:', user.id);
                const updatedUser = await uploadProfileImage(user.id, file);
                console.log('Updated user:', updatedUser);
                if (updatedUser && updatedUser.profileImageUrl) {
                    updateUser(updatedUser);
                    setSuccessMessage("Imagen de perfil actualizada con éxito.");
                    setImagePreview(updatedUser.profileImageUrl);
                } else {
                    throw new Error('No se recibió la URL de la imagen actualizada');
                }
            } catch (error) {
                console.error('Error al subir la imagen de perfil:', error);
                if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                } else {
                    setError(`No se pudo subir la imagen de perfil: ${error.message}`);
                }
            }
        }
    };
    
    const handleDeleteImage = async () => {
        try {
            if (!user || !user.id) {
                throw new Error('No se pudo obtener el ID del usuario');
            }
            const result = await deleteProfileImage(user.id);
            updateUser(result.user);
            setImagePreview('');
            setSuccessMessage(result.message);
        } catch (error) {
            console.error("Error al eliminar la imagen de perfil:", error);
            if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
            } else {
                setError(`No se pudo completar la operación: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        try {
            const updatedUser = await updateUserProfile(user.id, profileData);
            updateUser(updatedUser);
            setSuccessMessage("Perfil actualizado con éxito.");
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setError(error.message || "Hubo un error al actualizar el perfil. Por favor, intenta de nuevo.");
        }
    };

    const handleDeactivateAccount = async () => {
        try {
            if (!user || !user.id) {
                throw new Error('ID de usuario no disponible');
            }
            await deactivateUserAccount(user.id);
            setSuccessMessage("¡Cuenta desactivada con éxito!");
            logout();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Error al desactivar la cuenta:", error);
            setError(error.message || "Hubo un error al desactivar la cuenta. Por favor, intenta de nuevo.");
        }
    };




    return (
        <div className="edit-profile-container-fe">
            <div className='edit-profile-container'>
                <h1 className="edit-profile-title">Mi Perfil</h1>
                <p className="edit-profile-subtitle">Administra y protege tu cuenta</p>
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="form-layout">
                        <div className="form-fields">
                            <div className="form-group">
                                <label htmlFor="username">Nombre de usuario</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={profileData.username}
                                    onChange={handleChange}
                                />
                                <small>El nombre de usuario solo se puede cambiar una vez.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Número de Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="is_active">Estado de la cuenta</label>
                                <select
                                    id="is_active"
                                    name="is_active"
                                    value={profileData.is_active}
                                    onChange={handleChange}
                                >
                                    <option value={true}>Activa</option>
                                    <option value={false}>Inactiva</option>
                                </select>
                            </div>
                        </div>
                        <div className="profile-image-section">
                            <div className="profile-image-container">
                                {imagePreview ? (
                                    <div className="image-wrapper">
                                        <img src={imagePreview} alt="Perfil" className="profile-image" />
                                        <button type="button" onClick={handleDeleteImage} className="delete-image-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="profile-image-placeholder">No hay imagen</div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="profileImage"
                                name="profileImage"
                                onChange={handleImageChange}
                                accept="image/jpeg, image/png"
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="profileImage" className="select-image-button">
                                Seleccionar Imagen
                            </label>
                            <small>Tamaño de archivo: máximo 1 MB</small>
                            <small>Extensión de archivo: .JPEG, .PNG</small>
                        </div>
                    </div>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="save-button">Guardar</button>
                </form>
            </div>
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>¿Estás seguro de que deseas desactivar tu cuenta?</p>
                    <button onClick={handleDeactivateAccount}>Sí, desactivar</button>
                    <button onClick={() => setShowConfirmDialog(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default UserProfileEdit;