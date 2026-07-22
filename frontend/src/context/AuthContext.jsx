import { createContext, useState } from "react";
import { getToken, logoutUser } from "../services/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(getToken());
  });

  const [user, setUser] = useState(null);

  const login = (loginData = null) => {
    setUser(loginData?.user ?? loginData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};