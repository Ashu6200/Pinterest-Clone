import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProtectedAuth = ({ children }) => {
  const { currentUser } = UserAuth()

  if (!currentUser) {
    return <Navigate to='/login' />;
  } else {
    return children;
  }
};

export default ProtectedAuth;