import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    role: null,
  });

  const updateAuthState = (role) => {
    if (role) {
      try {
        setAuthState({
          role: role,
        });
      } catch (error) {
        console.error('Invalid rlo:', role);
      }
    } else {
      setAuthState({
        role: null,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
