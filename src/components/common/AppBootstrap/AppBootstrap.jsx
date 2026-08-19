import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDoctors } from '../../../features/doctors/doctorThunks';
import { fetchAppointments } from '../../../features/appointments/appointmentThunks';
import { fetchNotifications } from '../../../features/notifications/notificationThunks';

const AppBootstrap = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
    dispatch(fetchAppointments());
    dispatch(fetchNotifications());
  }, [dispatch]);

  return null;
};

export default AppBootstrap;
