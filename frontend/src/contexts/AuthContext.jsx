import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ NAMED IMPORT HERE

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setTokenState] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Stored Token Value from localStorage:", storedToken); // ✅ ADDED CONSOLE LOG
    if (storedToken) {
      setTokenState(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        setUser({ id: decoded.id, email: decoded.email }); // Adjust based on your JWT payload
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        logout(); // Token invalid, logout user
      }
    }
    setLoading(false); // Initial loading complete
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const setToken = (newToken) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
      try {
        const decoded = jwtDecode(newToken);
        setUser({ id: decoded.id, email: decoded.email }); // Adjust based on your JWT payload
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token during setToken:", error);
        logout(); // Token invalid, logout user
      }
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setRole(null);
    }
  };


  const login = async (token) => {
    setToken(token);
    navigate('/deals'); // Redirect after login
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    navigate('/login'); // Redirect to login page after logout
  };

  const contextData = {
    token,
    user,
    role,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <div>Loading...</div> : children} {/* Basic loading indicator */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);