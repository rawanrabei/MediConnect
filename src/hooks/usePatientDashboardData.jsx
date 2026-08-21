import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from './useAuth';
import { selectPatientAppointments } from '../features/appointments/appointmentSelectors';
import { selectAllDoctors, selectFavoriteIds } from '../features/doctors/doctorSelectors';
import { categorizeAppointments } from '../utils/appointmentUtils';

export const usePatientDashboardData = () => {
  const { user } = useAuth();
  const appointments = useSelector(selectPatientAppointments(user?.id));
  const favoriteIds = useSelector(selectFavoriteIds);
  const allDoctors = useSelector(selectAllDoctors);

  return useMemo(() => {
    const { upcoming, past, cancelled, completed } = categorizeAppointments(appointments);
    const favoriteDoctors = allDoctors.filter((doctor) => favoriteIds.includes(doctor.id));
    const recentAppointments = [...appointments]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 8);

    return {
      upcoming,
      past,
      cancelled,
      nextAppointment: upcoming[0] || null,
      recentAppointments,
      favoriteDoctors,
      stats: {
        upcoming: upcoming.length,
        completed: completed.length,
        cancelled: cancelled.length,
        favorites: favoriteIds.length,
      },
      chartData: [
        { name: 'Upcoming', value: upcoming.length, fill: 'var(--primary-600)' },
        { name: 'Completed', value: completed.length, fill: 'var(--success)' },
        { name: 'Cancelled', value: cancelled.length, fill: 'var(--error)' },
      ],
    };
  }, [appointments, favoriteIds, allDoctors]);
};
