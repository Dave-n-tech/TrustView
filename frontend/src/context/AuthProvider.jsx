import { createContext, useEffect, useState } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken)
    // check if token valid (send request to verify token)
    const verifyToken = async () => {
      try {
        const response = await axios.post('/verify-token', {}, {
          headers: {
            "Authorization": `Bearer ${storedToken}`,
          },
        }); 

        console.log(response.data)
        
      } catch (error) {
        console.error(error)

        if(error.response.status === 401){
          setAuthData(null)
        }
      }
    };

    verifyToken()
    // if token valid fetch authdata else clear authdata in localstorage

    if (storedToken) {
      const storedData = JSON.parse(localStorage.getItem("authData"));
      setAuthData(storedData);
    }
  }, []);

  const register = async (userData, isBusiness) => {
    setLoading(true);
    setError("");
    const endpoint = isBusiness
      ? "/auth/company/register"
      : "/auth/user/register";

    try {
      const response = await axios.post(`${endpoint}`, userData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { access_token, refresh_token, user } = await response.data;
      setAuthDpata(user);
      setLoggedIn(true);

      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("authData", JSON.stringify(user));
    } catch (error) {
      setError(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    setError("");
    const endpoint = "/auth/login";

    try {
      const response = await axios.post(`${url}${endpoint}`, credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const { access_token, refresh_token, user } = await response.data;
      setAuthData(user);
      setLoggedIn(true);

      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      localStorage.setItem("authData", JSON.stringify(user));
    } catch (error) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authData");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        register,
        logout,
        error,
        loading,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
