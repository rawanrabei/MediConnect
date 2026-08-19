import React from 'react';
import { useAuth } from '../hooks/useAuth';

const RoleRoute = ({ role, children }) => {
  const { user } = useAuth();

  if (user && user.role !== role) {
    return <div>Access Denied</div>;
  }

  return children;
};

export default RoleRoute;
