const baseURL = 'http://localhost:8080';

const api = {
    get: async (url, options = {}) => {
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response.json();
    },
    post: async (url, data, options = {}) => {
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    put: async (url, data, options = {}) => {
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },
    delete: async (url, options = {}) => {
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        return response.json();
    },
};

export default api;
