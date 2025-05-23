import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });

  const login = async (username, password) => {
    const { data } = await api.post("/users/login", { username, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(jwtDecode(data.token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuth: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
