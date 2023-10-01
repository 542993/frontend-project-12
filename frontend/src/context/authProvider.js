import React from 'react';
import { AuthContext } from './index.js';
import useAuth from '../hooks/useAuth.js';

const AuthProvider = ({ children }) => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
