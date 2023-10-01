import { useState } from 'react';
import authAPI from '../api/authAPI';

const useAuth = () => {
  const { signIn, signUp } = authAPI();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const initialState = currentUser || null;
  const [user, setUser] = useState(initialState);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('userData', userData);
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  return ({
    logIn,
    logOut,
    signIn,
    signUp,
    user,
  });
};
export default useAuth;
