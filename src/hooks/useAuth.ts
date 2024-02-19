import { useState, useEffect } from "react";
import ApiUserService from "../services/ApiUserService";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
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

  const login = (userId: string, userRole: string) => {
    localStorage.setItem("isAuthenticated", "true");

    setIsAuthenticated(true);
    setUserId(userId);
    setUserRole(userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);

    ApiUserService.logout(() => navigate("/auth"));
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
