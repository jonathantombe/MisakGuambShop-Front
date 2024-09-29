import api from './api';

const API_URL = '/api/auth';

export const registerUser = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/signup/user`, userData);

        if (response && response.user) {
            const userToStore = {
                ...response.user,
                username: userData.username,
                email: userData.email,
                phone: userData.phone
            };
            localStorage.setItem('user', JSON.stringify(userToStore));
            if (response.accessToken) {
                localStorage.setItem('token', response.accessToken);
            }
        }

        return response;
    } catch (error) {
        console.error("Error de registro:", error);
        throw error;
    }
};


export const registerSeller = async (sellerData) => {
    try {
        const response = await api.post(`${API_URL}/signup/seller`, sellerData);

        if (response && response.user) {
            // Almacenar los datos del vendedor incluyendo el nombre de usuario
            localStorage.setItem('user', JSON.stringify({
                username: sellerData.username,
                ...response.user
            }));
            if (response.accessToken) {
                localStorage.setItem('token', response.accessToken);
            }
        }

        return response;
    } catch (error) {
        console.error("Error de registro de vendedor:", error);
        throw error;
    }
};

export const loginUser = async (loginData) => {
    try {
        const response = await api.post(`${API_URL}/login`, loginData);

        if (response && response.user) {
            const userToStore = {
                ...response.user,
                id: response.user.id,
                email: loginData.email,
                username: response.user.username,
                phone: response.user.phone,
                is_active: response.user.is_active,
                profileImageUrl: response.user.profileImageUrl,
            };
            localStorage.setItem('user', JSON.stringify(userToStore));
            localStorage.setItem('token', response.accessToken);
            console.log('Usuario almacenado:', userToStore);
            return { ...response, user: userToStore };
        }
        return response;
    } catch (error) {
        console.error("Error de inicio de sesión:", error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    if (userStr && tokenStr) {
        const user = JSON.parse(userStr);
        if (!user.id) {
            console.warn('ID de usuario no encontrado en localStorage');
            return null;
        }
        return user;
    }
    return null;
};

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/api/users/${userId}`, profileData);

        if (response && response.user) {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            const updatedUser = { ...currentUser, ...response.user };
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }

        return response;
    } catch (error) {
        console.error("Error al actualizar el perfil de usuario:", error);
        throw error;
    }
};

export const deleteProfileImage = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.id) {
        console.error('Usuario no autenticado o ID no encontrado');
        throw new Error('Usuario no autenticado. Por favor, inicia sesión.');
    }
    try {
        const response = await api.delete(`/api/users/${currentUser.id}/profile-image`);
        if (response && response.user) {
            const updatedUser = { ...currentUser, profileImageUrl: null };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return updatedUser;
        }
        throw new Error('La respuesta del servidor no incluyó los datos del usuario actualizados');
    } catch (error) {
        console.error("Error al eliminar la imagen de perfil:", error);
        throw error;
    }
};

const handleImageUpload = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        const response = await api.post(`/api/users/${user.id}/profile-image`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response && response.user) {
            const updatedUser = { ...user, profileImageUrl: response.user.profileImageUrl };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    } catch (error) {
        console.error("Error uploading profile image:", error);
    }
};

export const refreshAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No hay token de autenticación');
    }
    try {
        const response = await api.post(`${API_URL}/refresh-token`, { token });
        if (response && response.accessToken) {
            localStorage.setItem('token', response.accessToken);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error al refrescar la autenticación:", error);
        return false;
    }
};

const handleDeleteImage = async () => {
    try {
        await refreshAuth(); // Intenta refrescar la autenticación antes de eliminar
        const updatedUser = await deleteProfileImage();
        setUser(updatedUser);
        // Actualizar la UI para reflejar que la imagen ha sido eliminada
    } catch (error) {
        if (error.message === 'Usuario no autenticado. Por favor, inicia sesión.') {
            alert('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
            // Redirigir al usuario a la página de inicio de sesión
            // history.push('/login');
        } else {
            console.error("Error al eliminar la imagen de perfil:", error);
            alert('Hubo un problema al eliminar la imagen de perfil. Por favor, intenta de nuevo.');
        }
    }
};

// Manejo de respuesta para los registros
const handleResponse = async (response) => {
    if (response && response.headers) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return await response.json();
        } else {
            return await response.text();
        }
    } else {
        return "Operación exitosa"; // Si no hay respuesta o headers, devolver un mensaje genérico
    }
};

const handleError = async (error) => {
    console.error("Error:", error);

    if (error.response) {
        const contentType = error.response.headers && error.response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const errorData = await error.response.json();
            throw new Error(errorData.message || "Ocurrió un error inesperado");
        } else {
            const errorText = await error.response.text();
            throw new Error(errorText || "Ocurrió un error inesperado");
        }
    }
    throw new Error("Ocurrió un error inesperado");
};