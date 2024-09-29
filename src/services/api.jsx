const baseURL = 'http://localhost:8080';

const getAuthToken = () => localStorage.getItem('token');

const parseResponse = async (response) => {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return response.text();
    }
};

const api = {
    get: async (url, options = {}) => {
        const token = getAuthToken();
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
        });
        if (!response.ok) {
            const errorBody = await parseResponse(response);
            throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
        }
        return parseResponse(response);
    },
    post: async (url, data, options = {}) => {
        const token = getAuthToken();
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorBody = await parseResponse(response);
            throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
        }
        return parseResponse(response);
    },
    put: async (url, data, options = {}) => {
        const token = getAuthToken();
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                ...options.headers,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorBody = await parseResponse(response);
            throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
        }
        return parseResponse(response);
    },
    delete: async (url, options = {}) => {
        const token = getAuthToken();
        if (!token) {
            throw new Error('No authentication token found');
        }
        try {
            const response = await fetch(`${baseURL}${url}`, {
                ...options,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    ...options.headers,
                },
            });

            if (!response.ok) {
                const errorBody = await parseResponse(response);
                console.error('Server response:', response.status, errorBody);
                throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
            }

            return parseResponse(response);
        } catch (error) {
            console.error('Error in delete request:', error);
            throw error;
        }
    },
};
export default api;