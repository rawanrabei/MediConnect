import { createSelector } from '@reduxjs/toolkit';
import { selectAllDoctors } from '../doctors/doctorSelectors';
import { MOCK_PATIENT } from '../../data/mockAuth';
import {
  DEFAULT_DOCTOR_STATUS,
  MOCK_ADMIN,
  USER_STATUSES,
} from '../../data/mockAdminData';
import { APPOINTMENT_STATUSES, parseAppointmentDateTime } from '../../utils/appointmentUtils';

const selectAdminState = (state) => state.admin;
const selectAppointments = (state) => state.appointments.appointments;

export const selectUserStatus = (userId) => (state) =>
  state.admin.userStatuses[userId] || USER_STATUSES.ACTIVE;

export const selectDoctorStatus = (doctorId) => (state) =>
  state.admin.doctorStatuses[doctorId] || DEFAULT_DOCTOR_STATUS;

const selectDoctorsList = (state) => selectAllDoctors(state);

export const selectPlatformUsers = createSelector(
  [selectAppointments, selectAdminState, selectDoctorsList],
  (appointments, admin, doctors) => {
    const users = [
      {
        ...MOCK_ADMIN,
        status: admin.userStatuses[MOCK_ADMIN.id] || USER_STATUSES.ACTIVE,
      },
      {
        ...MOCK_PATIENT,
        createdAt: '2026-02-10T09:00:00.000Z',
        status: admin.userStatuses[MOCK_PATIENT.id] || USER_STATUSES.ACTIVE,
      },
    ];

    doctors.forEach((doctor) => {
      const userId = `doctor-${doctor.id}`;
      users.push({
        id: userId,
        doctorId: doctor.id,
        name: doctor.name,
        email: `doctor${doctor.id}@mediconnect.com`,
        role: 'doctor',
        createdAt: '2026-03-01T08:00:00.000Z',
        status: admin.userStatuses[userId] || USER_STATUSES.ACTIVE,
      });
    });

    const patientMap = new Map();
    appointments.forEach((appointment) => {
      const key = String(appointment.patientId);
      if (patientMap.has(key)) return;

      patientMap.set(key, {
        id: appointment.patientId,
        name: appointment.patientInfo?.fullName || 'Patient',
        email: appointment.patientInfo?.email || '—',
        role: 'patient',
        createdAt: appointment.createdAt || '2026-04-01T10:00:00.000Z',
        status: admin.userStatuses[appointment.patientId] || USER_STATUSES.ACTIVE,
      });
    });

    patientMap.forEach((patient) => users.push(patient));
    return users;
  }
);

export const selectPlatformDoctors = createSelector(
  [selectAdminState, selectDoctorsList],
  (admin, doctors) =>
    doctors.map((doctor) => ({
      ...doctor,
      status: admin.doctorStatuses[doctor.id] || DEFAULT_DOCTOR_STATUS,
    }))
);

export const selectPlatformPatients = createSelector(
  [selectAppointments, selectAdminState],
  (appointments, admin) => {
    const map = new Map();

    appointments.forEach((appointment) => {
      const key = String(appointment.patientId);
      const existing = map.get(key) || {
        patientId: appointment.patientId,
        name: appointment.patientInfo?.fullName || 'Patient',
        email: appointment.patientInfo?.email || '—',
        phone: appointment.patientInfo?.phone || '—',
        appointments: [],
      };
      existing.appointments.push(appointment);
      map.set(key, existing);
    });

    return [...map.values()].map((patient) => {
      const sorted = [...patient.appointments].sort(
        (a, b) => parseAppointmentDateTime(b.date, b.time) - parseAppointmentDateTime(a.date, a.time)
      );

      return {
        ...patient,
        totalAppointments: patient.appointments.length,
        lastAppointment: sorted[0] || null,
        status: admin.userStatuses[patient.patientId] || USER_STATUSES.ACTIVE,
      };
    });
  }
);

export const selectPlatformStats = createSelector(
  [selectPlatformUsers, selectPlatformDoctors, selectAppointments],
  (users, doctors, appointments) => {
    const patients = users.filter((user) => user.role === 'patient');
    const completed = appointments.filter((a) => a.status === APPOINTMENT_STATUSES.COMPLETED).length;
    const cancelled = appointments.filter((a) => a.status === APPOINTMENT_STATUSES.CANCELLED).length;
    const pending = appointments.filter((a) => a.status === APPOINTMENT_STATUSES.PENDING).length;
    const confirmed = appointments.filter((a) => a.status === APPOINTMENT_STATUSES.CONFIRMED).length;

    return {
      totalPatients: patients.length,
      totalDoctors: doctors.length,
      totalUsers: users.length,
      totalAppointments: appointments.length,
      completedAppointments: completed,
      cancelledAppointments: cancelled,
      pendingConfirmedAppointments: pending + confirmed,
      pendingAppointments: pending,
      confirmedAppointments: confirmed,
      appointmentChartData: [
        { name: 'Pending', value: pending, fill: 'var(--warning, #f59e0b)' },
        { name: 'Confirmed', value: confirmed, fill: 'var(--primary-600)' },
        { name: 'Completed', value: completed, fill: 'var(--success)' },
        { name: 'Cancelled', value: cancelled, fill: 'var(--error)' },
      ],
      userOverview: [
        { name: 'Patients', value: patients.length, fill: 'var(--primary-600)' },
        { name: 'Doctors', value: doctors.filter((d) => d.status === 'approved').length, fill: 'var(--success)' },
        { name: 'Admins', value: users.filter((u) => u.role === 'admin').length, fill: 'var(--navy)' },
      ],
      doctorOverview: {
        approved: doctors.filter((d) => d.status === 'approved').length,
        pending: doctors.filter((d) => d.status === 'pending').length,
        suspended: doctors.filter((d) => d.status === 'suspended').length,
      },
    };
  }
);

export const selectSpecialtyStats = createSelector(
  [selectAppointments],
  (appointments) => {
    const counts = {};
    appointments.forEach((appointment) => {
      const specialty = appointment.specialty || 'Unknown';
      counts[specialty] = (counts[specialty] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value, fill: 'var(--primary-600)' }))
      .sort((a, b) => b.value - a.value);
  }
);

export const selectDoctorSpecialtyDistribution = createSelector(
  [selectPlatformDoctors],
  (doctors) => {
    const counts = {};
    doctors.forEach((doctor) => {
      counts[doctor.specialty] = (counts[doctor.specialty] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value, fill: 'var(--primary-500, #3b82f6)' }))
      .sort((a, b) => b.value - a.value);
  }
);

export const selectRecentAppointments = createSelector(
  [selectAppointments],
  (appointments) =>
    [...appointments]
      .sort((a, b) => parseAppointmentDateTime(b.date, b.time) - parseAppointmentDateTime(a.date, a.time))
      .slice(0, 6)
);
