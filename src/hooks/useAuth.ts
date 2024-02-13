import { useState, useEffect } from "react";
import ApiUserService from "../services/ApiUserService";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      setIsAuthenticated(true);

      const storedUserId = localStorage.getItem("userId");
      const storedUserRole = localStorage.getItem("role");

      setUserId(storedUserId);
      setUserRole(storedUserRole);
    } else {
      setIsAuthenticated(false);

      setUserId(null);
      setUserRole(null);
    }
  }, []);

  const login = (userId: string, userRole: string, accessToken: string) => {
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", userRole);
    localStorage.setItem("accessToken", accessToken);

    setIsAuthenticated(true);
    setUserId(userId);
    setUserRole(userRole);
  };

  const logout = () => {
    ApiUserService.logout();
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");

    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);

    navigate("/auth");
  };

  return {
    isAuthenticated,
    userId,
    userRole,
    login,
    logout,
  };
};

export default useAuth;
