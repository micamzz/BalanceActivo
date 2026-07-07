// src/components/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, rolesPermitidos }) => {
  const { user, loading } = useAuth();

  // Mientras se verifica el estado de autenticación, mostramos un mensaje de carga.
  // Esto es crucial para no redirigir al login prematuramente en una recarga de página.
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario autenticado, lo mandamos a loguearse.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si está logueado pero su rol no está permitido, le mostramos la página de No Autorizado.
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/no-autorizado" />;
  }

  // Si hay un usuario (y su rol está permitido), renderizamos el componente hijo que está siendo protegido.
  return <>{children}</>;
};

export default ProtectedRoute;