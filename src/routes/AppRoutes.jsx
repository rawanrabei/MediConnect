import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import ForgotPassword from '../pages/Auth/ForgotPassword/ForgotPassword';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import Booking from '../pages/Booking/Booking';
import BookingSuccess from '../pages/Booking/BookingSuccess';
import PatientDashboard from '../pages/Patient/Dashboard';
import PatientAppointments from '../pages/Patient/Appointments';
import AppointmentDetails from '../pages/Patient/AppointmentDetails';
import Favorites from '../pages/Patient/Favorites';
import Notifications from '../pages/Patient/Notifications';
import Profile from '../pages/Patient/Profile';
import DoctorDashboard from '../pages/Doctor/Dashboard';
import DoctorAppointments from '../pages/Doctor/Appointments';
import Patients from '../pages/Doctor/Patients';
import Availability from '../pages/Doctor/Availability';
import DoctorProfile from '../pages/Doctor/Profile';
import DoctorAppointmentDetails from '../pages/Doctor/AppointmentDetails';
import DoctorPatientDetails from '../pages/Doctor/PatientDetails';
import DoctorNotifications from '../pages/Doctor/Notifications';
import AdminDashboard from '../pages/Admin/Dashboard';
import Users from '../pages/Admin/Users';
import AdminDoctors from '../pages/Admin/Doctors';
import AdminPatients from '../pages/Admin/Patients';
import AdminAppointments from '../pages/Admin/Appointments';
import AdminAppointmentDetails from '../pages/Admin/AppointmentDetails';
import Analytics from '../pages/Admin/Analytics';
import NotFound from '../pages/NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';
import PublicLayout from '../layouts/PublicLayout';
import PatientLayout from '../layouts/PatientLayout';
import DoctorLayout from '../layouts/DoctorLayout';
import AdminLayout from '../layouts/AdminLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
      <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
      <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
      <Route path="/doctors" element={<PublicLayout><Doctors /></PublicLayout>} />
      <Route path="/doctors/:id" element={<PublicLayout><DoctorDetails /></PublicLayout>} />
      <Route path="/booking" element={<PublicLayout><Booking /></PublicLayout>} />
      <Route path="/booking/success" element={<PublicLayout><BookingSuccess /></PublicLayout>} />
      <Route path="/booking/:doctorId" element={<PublicLayout><Booking /></PublicLayout>} />
      
      <Route path="/patient/dashboard" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><PatientDashboard /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/patient/appointments" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><PatientAppointments /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/patient/appointments/:id" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><AppointmentDetails /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/patient/favorites" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><Favorites /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/patient/notifications" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><Notifications /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/patient/profile" element={
        <ProtectedRoute>
          <RoleRoute role="patient">
            <PatientLayout><Profile /></PatientLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/doctor/dashboard" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorDashboard /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/appointments" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorAppointments /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/patients" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><Patients /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/availability" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><Availability /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/appointments/:id" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorAppointmentDetails /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/patients/:patientId" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorPatientDetails /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/notifications" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorNotifications /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/doctor/profile" element={
        <ProtectedRoute>
          <RoleRoute role="doctor">
            <DoctorLayout><DoctorProfile /></DoctorLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><AdminDashboard /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><Users /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/doctors" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><AdminDoctors /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/patients" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><AdminPatients /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><AdminAppointments /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/appointments/:id" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><AdminAppointmentDetails /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute>
          <RoleRoute role="admin">
            <AdminLayout><Analytics /></AdminLayout>
          </RoleRoute>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  );
};

export default AppRoutes;
