import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, name }) => {
  const isAuthenticated = name != null && name != "";

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
