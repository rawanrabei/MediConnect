import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout/DashboardLayout';

const PatientLayout = ({ children }) => {
  return (
    <DashboardLayout role="patient">
      {children}
    </DashboardLayout>
  );
};

export default PatientLayout;
