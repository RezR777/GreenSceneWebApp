import { useState, useEffect } from "react";
import { getToken, logoutUser } from "../services/authService";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    login,
    logout
  };
};
