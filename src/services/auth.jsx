import api from './api';

const API_URL = '/api/auth';

export const registerUser = async (userData) => {
    try {
        const response = await api.post(`${API_URL}/signup/user`, userData);

        // Verificar si la respuesta existe y tiene encabezados
        if (response && response.headers) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return await response.json();
            } else {
                return await response.text();
            }
        } else {
            // Si la respuesta o los encabezados son indefinidos, devolver un mensaje de éxito genérico
            return "Registro exitoso";
        }
    } catch (error) {
        console.error("Error de registro:", error);

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
        throw new Error("Ocurrió un error inesperado durante el registro");
    }
};

export const registerSeller = async (sellerData) => {
    try {
        const response = await api.post(`${API_URL}/signup/seller`, sellerData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Inicio de sesión (Login)
export const loginUser = async (loginData) => {
    try {
        const response = await api.post(`${API_URL}/login`, loginData);

        if (response.accessToken) {
            // Guardar el token en localStorage
            localStorage.setItem('token', response.accessToken);
            localStorage.setItem('user', JSON.stringify(loginData)); // Guarda los datos del usuario si es necesario
        }
        return response; // Devolver la respuesta completa para manejo en el frontend
    } catch (error) {
        return handleError(error);
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

// Manejo de errores
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