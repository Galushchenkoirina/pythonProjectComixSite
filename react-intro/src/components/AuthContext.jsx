import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState(null);

    const login = (name) => {
        setIsAuthenticated(true);
        setUsername(name); // Сохраняем имя пользователя
    };

    const register = (name) => {
        setIsAuthenticated(true);
        setUsername(name); // Сохраняем имя пользователя
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, username, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

