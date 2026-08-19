import React from 'react';
import { useSelector } from 'react-redux';
import AnalyticsCharts from '../../components/admin/AnalyticsCharts/AnalyticsCharts';
import AdminStats from '../../components/admin/AdminStats/AdminStats';
import {
  selectDoctorSpecialtyDistribution,
  selectPlatformStats,
  selectSpecialtyStats,
} from '../../features/admin/adminSelectors';
import { adminDashboard } from '../../constants/uiClasses';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';

const Analytics = () => {
  const stats = useSelector(selectPlatformStats);
  const specialtyStats = useSelector(selectSpecialtyStats);
  const doctorDistribution = useSelector(selectDoctorSpecialtyDistribution);

  return (
    <div className={adminDashboard}>
      <header className={pageIntro}>
        <p>Platform analytics derived from live appointment and user data.</p>
      </header>

      <AdminStats stats={stats} />

      <AnalyticsCharts
        appointmentStatusData={stats.appointmentChartData}
        specialtyData={specialtyStats}
        userOverviewData={stats.userOverview}
        doctorDistributionData={doctorDistribution}
      />
    </div>
  );
};

export default Analytics;
