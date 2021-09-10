import * as React from 'react';
import {useEffect, useState} from 'react';

const initialState = {
    isLoggedIn: false,
    onLogout: () => {
    },
    onLogin: () => {
    }
};

const AuthContext = React.createContext(initialState);

export const AuthContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
    });

    const onLogout = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const onLogin = (email, password) => {
        console.log('logging in', email, password.replaceAll(/./g, 'x'));
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, onLogout, onLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
