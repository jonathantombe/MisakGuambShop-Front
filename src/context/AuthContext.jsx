import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        // Asegurarse de que todos los datos relevantes se guarden
        const userToStore = {
            ...userData,
            username: userData.username,
            email: userData.email,
            phone: userData.phone
        };
        setUser(userToStore);
        localStorage.setItem('user', JSON.stringify(userToStore));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser: setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
