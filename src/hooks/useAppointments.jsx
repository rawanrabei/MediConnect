import { useSelector } from 'react-redux';
import { selectAppointments, selectAppointmentsLoading, selectAppointmentsError } from '../features/appointments/appointmentSelectors';

export const useAppointments = () => {
  const appointments = useSelector(selectAppointments);
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectAppointmentsError);

  return {
    appointments,
    loading,
    error,
  };
};

export default useAppointments;
