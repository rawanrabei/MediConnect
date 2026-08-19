import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../Sidebar/Sidebar';
import PatientHeader from '../PatientHeader/PatientHeader';
import { setSidebarOpen } from '../../../features/ui/uiSlice';
import { dashboardLayout, dashboardMain } from '../../../constants/uiClasses';

const DashboardLayout = ({ children, role }) => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const handleMenuClick = () => {
    dispatch(setSidebarOpen(true));
  };

  return (
    <div className={dashboardLayout}>
      <Sidebar role={role} isOpen={sidebarOpen} />
      <div className={dashboardMain}>
        {(role === 'patient' || role === 'doctor' || role === 'admin') && (
          <PatientHeader role={role} onMenuClick={handleMenuClick} />
        )}
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
