const baseURL = 'http://localhost:8080';

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
        const response = await fetch(`${baseURL}${url}`, {
            ...options,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return parseResponse(response);
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
        if (!response.ok) {
            const errorBody = await parseResponse(response);
            throw new Error(typeof errorBody === 'string' ? errorBody : JSON.stringify(errorBody));
        }
        return parseResponse(response);
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return parseResponse(response);
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
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return parseResponse(response);
    },
};

export default api;