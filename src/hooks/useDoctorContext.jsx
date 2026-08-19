import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { selectDoctorById } from '../features/doctors/doctorSelectors';
import { selectDoctorAppointments } from '../features/appointments/appointmentSelectors';
import { selectDoctorProfileOverride } from '../features/doctors/doctorPortalSelectors';
import { categorizeAppointments } from '../utils/appointmentUtils';
import {
  getDoctorDashboardStats,
  getUniqueDoctorPatients,
} from '../utils/doctorUtils';

export const useDoctorContext = () => {
  const { user } = useAuth();
  const doctorId = user?.doctorId;
  const baseDoctor = useSelector(selectDoctorById(doctorId));
  const profileOverride = useSelector(selectDoctorProfileOverride(doctorId));

  const doctor = useMemo(() => {
    if (!baseDoctor) return null;
    return { ...baseDoctor, ...profileOverride };
  }, [baseDoctor, profileOverride]);

  return { user, doctorId, doctor };
};

export const useDoctorDashboardData = () => {
  const { doctorId } = useDoctorContext();
  const appointments = useSelector(selectDoctorAppointments(doctorId));

  return useMemo(() => {
    const stats = getDoctorDashboardStats(appointments);
    const { upcoming, past } = categorizeAppointments(appointments);
    const todayAppointments = appointments.filter(
      (appointment) =>
        appointment.status !== 'cancelled' &&
        new Date(`${appointment.date}T00:00:00`).toDateString() === new Date().toDateString()
    );
    const recentPatients = getUniqueDoctorPatients(appointments).slice(0, 4);

    return {
      stats,
      todayAppointments,
      upcomingAppointments: upcoming.slice(0, 5),
      recentAppointments: [...upcoming, ...past].slice(0, 4),
      recentPatients,
      chartData: stats.chartData,
    };
  }, [appointments]);
};
