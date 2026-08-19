import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import AdminWelcome from '../../components/admin/AdminWelcome/AdminWelcome';
import AdminStats from '../../components/admin/AdminStats/AdminStats';
import AdminAppointmentChart from '../../components/admin/AdminAppointmentChart/AdminAppointmentChart';
import UserOverview from '../../components/admin/UserOverview/UserOverview';
import DoctorOverview from '../../components/admin/DoctorOverview/DoctorOverview';
import RecentAppointmentsTable from '../../components/admin/RecentAppointmentsTable/RecentAppointmentsTable';
import AdminQuickActions from '../../components/admin/AdminQuickActions/AdminQuickActions';
import {
  selectPlatformStats,
  selectRecentAppointments,
} from '../../features/admin/adminSelectors';
import { adminDashboard, adminDashboardGrid } from '../../constants/uiClasses';

const AdminDashboard = () => {
  const { user } = useAuth();
  const stats = useSelector(selectPlatformStats);
  const recentAppointments = useSelector(selectRecentAppointments);

  return (
    <div className={adminDashboard}>
      <AdminWelcome name={user?.name} />
      <AdminStats stats={stats} />

      <div className={adminDashboardGrid}>
        <AdminAppointmentChart data={stats.appointmentChartData} />
        <AdminQuickActions />
      </div>

      <div className={adminDashboardGrid}>
        <UserOverview data={stats.userOverview} />
        <DoctorOverview overview={stats.doctorOverview} />
      </div>

      <RecentAppointmentsTable appointments={recentAppointments} />
    </div>
  );
};

export default AdminDashboard;
