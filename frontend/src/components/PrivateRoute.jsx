import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated spinner
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;