import React, { useState } from 'react';
import authAPI from '../api/authAPI';
import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
// eslint-disable-next-line react/jsx-no-constructed-context-values
  const { signIn, signUp } = authAPI();  
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialState = currentUser || null;
  const [user, setUser] = useState(initialState);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={
      {
        user,
        logIn,
        logOut,
        signIn,
        signUp,
      }
   }>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
