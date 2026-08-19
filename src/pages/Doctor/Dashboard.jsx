import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DoctorWelcome from '../../components/doctorDashboard/DoctorWelcome/DoctorWelcome';
import DoctorStats from '../../components/doctorDashboard/DoctorStats/DoctorStats';
import AppointmentTable from '../../components/doctorDashboard/AppointmentTable/AppointmentTable';
import DoctorAnalytics from '../../components/doctorDashboard/DoctorAnalytics/DoctorAnalytics';
import DoctorPatientList from '../../components/doctorDashboard/DoctorPatientList/DoctorPatientList';
import DoctorQuickActions from '../../components/doctorDashboard/DoctorQuickActions/DoctorQuickActions';
import Modal from '../../components/common/Modal/Modal';
import { useDoctorContext, useDoctorDashboardData } from '../../hooks/useDoctorContext';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { btn, doctorDashboard, doctorDashboardGrid } from '../../constants/uiClasses';

const DoctorDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useDoctorContext();
  const {
    stats,
    todayAppointments,
    upcomingAppointments,
    recentPatients,
    chartData,
  } = useDoctorDashboardData();
  const [cancelTarget, setCancelTarget] = useState(null);

  const handleAccept = (appointmentId) => {
    dispatch(patchAppointmentStatus({
      id: appointmentId,
      status: APPOINTMENT_STATUSES.CONFIRMED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_confirmed',
      title: 'Appointment accepted',
      message: 'You confirmed a pending appointment.',
      date: new Date().toISOString(),
      read: false,
    }));
  };

  const handleComplete = (appointmentId) => {
    dispatch(patchAppointmentStatus({
      id: appointmentId,
      status: APPOINTMENT_STATUSES.COMPLETED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_completed',
      title: 'Appointment completed',
      message: 'An appointment was marked as completed.',
      date: new Date().toISOString(),
      read: false,
    }));
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;

    dispatch(patchAppointmentStatus({
      id: cancelTarget.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_cancelled',
      title: 'Appointment cancelled',
      message: `Appointment with ${cancelTarget.patientInfo?.fullName || 'patient'} was cancelled.`,
      date: new Date().toISOString(),
      read: false,
    }));
    setCancelTarget(null);
  };

  return (
    <div className={doctorDashboard}>
      <DoctorWelcome name={user?.name} />
      <DoctorStats stats={stats} />

      <AppointmentTable
        appointments={todayAppointments}
        title="Today's Appointments"
        showReason
        showLocation
        onAccept={handleAccept}
        onComplete={handleComplete}
        onCancel={setCancelTarget}
      />

      <div className={doctorDashboardGrid}>
        <AppointmentTable
          appointments={upcomingAppointments}
          title="Upcoming Appointments"
          compact
          onAccept={handleAccept}
          onComplete={handleComplete}
          onCancel={setCancelTarget}
        />
        <DoctorQuickActions />
      </div>

      <div className={doctorDashboardGrid}>
        <DoctorAnalytics data={chartData} />
        <DoctorPatientList patients={recentPatients} compact />
      </div>

      <Modal
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Appointment"
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className={btn('primary')} onClick={handleConfirmCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btn('ghost')} onClick={() => setCancelTarget(null)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorDashboard;
