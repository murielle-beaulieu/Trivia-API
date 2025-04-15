import { createContext, ReactNode, useState } from "react";

import axios from 'axios';

interface AuthContextProviderProps {
	children: ReactNode;
}

// interface AuthState {
//     user: User;
//     accessToken: string;
//   }

//   interface User {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//   }
  

export const AuthContext = createContext<AuthState>({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState<AuthState>({});

    const 
    
    return (
        <AuthContext.Provider value={{ auth, setAuth}} >
            {children}
        </AuthContext.Provider>
    )
}
