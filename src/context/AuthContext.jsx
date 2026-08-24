import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const { data } = useData();
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('amisphere_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('amisphere_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('amisphere_user');
        }
    }, [user]);

    const login = (id, password, role) => {
        // Find user in "Mock DB"
        const foundUser = data.users.find(u => u.id === id && u.password === password && u.role === role);
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
