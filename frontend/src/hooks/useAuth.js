import { useState } from 'react';
import authAPI from '../api/authAPI';

const useAuth = () => {
  const { signIn, signUp } = authAPI();
  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log('current user', currentUser);
  const initialState = currentUser || null;
  const [user, setUser] = useState(initialState);
  console.log('user is', user);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('userData', userData);
    setUser(userData);
    console.log('user is', user);
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
