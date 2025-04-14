import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authConfig'; // Aqui você checa se o token existe
import React from 'react';

interface AutenticateUserConfigProps {
  children: React.ReactNode;
}

export const AutenticateUserConfig: React.FC<AutenticateUserConfigProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
