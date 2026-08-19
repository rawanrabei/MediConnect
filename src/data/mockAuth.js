import { mockDoctors } from './doctors.js';

export const MOCK_PATIENT = {
  id: 'patient-1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  phone: '+20 100 123 4567',
  dateOfBirth: '1995-06-12',
  gender: 'female',
  role: 'patient',
};

export const MOCK_DOCTOR_USER = {
  id: 'doctor-user-1',
  doctorId: 1,
  name: 'Dr. Sarah Ahmed',
  email: 'doctor@mediconnect.com',
  phone: '+20 100 987 6543',
  role: 'doctor',
};

export const MOCK_ADMIN_USER = {
  id: 'admin-1',
  name: 'Platform Admin',
  email: 'admin@mediconnect.com',
  role: 'admin',
};

export const createMockAuthResponse = (email, name, role = 'patient') => {
  if (role === 'admin') {
    return {
      user: {
        ...MOCK_ADMIN_USER,
        email: email || MOCK_ADMIN_USER.email,
        name: name || MOCK_ADMIN_USER.name,
      },
      token: 'mock-token',
    };
  }

  if (role === 'doctor') {
    const linkedDoctor = mockDoctors.find((doctor) => doctor.id === 1) || mockDoctors[0];
    return {
      user: {
        id: MOCK_DOCTOR_USER.id,
        doctorId: linkedDoctor.id,
        name: linkedDoctor.name,
        email: email || MOCK_DOCTOR_USER.email,
        phone: MOCK_DOCTOR_USER.phone,
        role: 'doctor',
      },
      token: 'mock-token',
    };
  }

  return {
    user: {
      id: MOCK_PATIENT.id,
      name: name || MOCK_PATIENT.name,
      email: email || MOCK_PATIENT.email,
      phone: MOCK_PATIENT.phone,
      dateOfBirth: MOCK_PATIENT.dateOfBirth,
      gender: MOCK_PATIENT.gender,
      role: 'patient',
    },
    token: 'mock-token',
  };
};
