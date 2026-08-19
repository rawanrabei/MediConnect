import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

const DoctorLayout = ({ children }) => {
  return (
    <DashboardLayout role="doctor">
      {children}
    </DashboardLayout>
  );
};

export default DoctorLayout;
