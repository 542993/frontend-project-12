import React, { useState, useMemo } from 'react';
import authAPI from '../api/authAPI';
import { AuthContext } from './index.js';
// eslint-disable-next-line
const AuthProvider = ({ children }) => {
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
    <AuthContext.Provider value={useMemo(() => (
      { user, signIn, signUp, logIn, logOut }), [user, signIn, signUp, logIn, logOut])}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
