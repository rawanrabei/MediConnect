import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import authReducer from '../features/auth/authSlice';
import doctorReducer from '../features/doctors/doctorSlice';
import doctorPortalReducer from '../features/doctors/doctorPortalSlice';
import appointmentReducer from '../features/appointments/appointmentSlice';
import notificationReducer from '../features/notifications/notificationSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    doctors: doctorReducer,
    doctorPortal: doctorPortalReducer,
    appointments: appointmentReducer,
    notifications: notificationReducer,
    ui: uiReducer,
  },
});

export default store;
