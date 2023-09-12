import React, { useState } from "react";
import authAPI from "../api/authAPI";
import AuthContext from ".";

const AuthProvider = ({ children }) => {
  const { signIn, signUp } = authAPI();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("currentUser", currentUser);
  const initialState = currentUser || null;
  const [user, setUser] = useState(initialState);

  const logIn = (userData) => {
    console.log('userData',userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ user, logIn, logOut, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
