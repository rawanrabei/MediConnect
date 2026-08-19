import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

const AdminLayout = ({ children }) => {
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
};

export default AdminLayout;
