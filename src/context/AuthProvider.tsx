import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLogin: boolean;
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: AuthContextType = {
    isLogin: false,
    setLogin: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
    const [isLogin, setLogin] = useState<boolean>(() => {
        const savedAuthStatus = localStorage.getItem('isLoggedIn');
        return savedAuthStatus === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLogin));
    }, [isLogin]);

    return (
        <AuthContext.Provider value={{ isLogin, setLogin }}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = (): AuthContextType => useContext(AuthContext);

export { AuthProvider, useAuth };