import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { usePatientDashboardData } from '../../hooks/usePatientDashboardData';
import PatientWelcome from '../../components/patient/PatientWelcome/PatientWelcome';
import PatientStats from '../../components/patient/PatientStats/PatientStats';
import UpcomingAppointment from '../../components/patient/UpcomingAppointment/UpcomingAppointment';
import RecentAppointments from '../../components/patient/RecentAppointments/RecentAppointments';
import FavoriteDoctorsSection from '../../components/patient/FavoriteDoctorsSection/FavoriteDoctorsSection';
import QuickActions from '../../components/patient/QuickActions/QuickActions';
import AppointmentOverviewChart from '../../components/patient/AppointmentOverviewChart/AppointmentOverviewChart';
import Modal from '../../components/common/Modal/Modal';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { btnGhost, btnPrimary, patientDashboard, patientDashboardGrid } from '../../constants/uiClasses';

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const {
    stats,
    nextAppointment,
    recentAppointments,
    favoriteDoctors,
    chartData,
  } = usePatientDashboardData();
  const [cancelTarget, setCancelTarget] = useState(null);

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    dispatch(patchAppointmentStatus({
      id: cancelTarget.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    dispatch(createNotification({
      role: 'patient',
      type: 'appointment_cancelled',
      title: 'Appointment cancelled',
      message: `Your appointment with ${cancelTarget.doctorName} was cancelled.`,
      date: new Date().toISOString(),
      read: false,
    }));
    setCancelTarget(null);
  };

  return (
    <div className={patientDashboard}>
      <PatientWelcome name={user?.name} />
      <PatientStats stats={stats} />

      <div className={patientDashboardGrid}>
        <UpcomingAppointment appointment={nextAppointment} onCancel={setCancelTarget} />
        <QuickActions />
      </div>

      <div className={patientDashboardGrid}>
        <RecentAppointments appointments={recentAppointments} />
        <AppointmentOverviewChart data={chartData} />
      </div>

      <FavoriteDoctorsSection doctors={favoriteDoctors} />

      <Modal
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Appointment"
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <button type="button" className={btnPrimary} onClick={handleConfirmCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btnGhost} onClick={() => setCancelTarget(null)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PatientDashboard;
