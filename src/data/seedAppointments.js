import { MOCK_PATIENT } from './mockAuth.js';

const toLocalISO = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const demoPatientInfo = {
  fullName: MOCK_PATIENT.name,
  email: MOCK_PATIENT.email,
  phone: MOCK_PATIENT.phone,
  dateOfBirth: MOCK_PATIENT.dateOfBirth,
  gender: MOCK_PATIENT.gender,
};

export const seedAppointments = [
  {
    id: 'seed-apt-1',
    doctorId: 1,
    patientId: MOCK_PATIENT.id,
    doctorName: 'Dr. Sarah Ahmed',
    specialty: 'Dermatology',
    date: toLocalISO(today),
    dateLabel: 'Today',
    time: '10:00 AM',
    location: 'Nile Dermatology Clinic, Cairo',
    fee: 500,
    currency: 'EGP',
    status: 'pending',
    patientInfo: {
      ...demoPatientInfo,
      reason: 'Skin rash follow-up',
      notes: 'Prefers morning appointments',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-apt-2',
    doctorId: 1,
    patientId: 'patient-demo-2',
    doctorName: 'Dr. Sarah Ahmed',
    specialty: 'Dermatology',
    date: toLocalISO(today),
    dateLabel: 'Today',
    time: '02:00 PM',
    location: 'Nile Dermatology Clinic, Cairo',
    fee: 500,
    currency: 'EGP',
    status: 'confirmed',
    patientInfo: {
      fullName: 'Youssef Ali',
      email: 'youssef.a@example.com',
      phone: '+20 102 333 4455',
      dateOfBirth: '1988-07-22',
      gender: 'male',
      reason: 'Annual skin check',
      notes: '',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-apt-3',
    doctorId: 1,
    patientId: 'patient-demo-3',
    doctorName: 'Dr. Sarah Ahmed',
    specialty: 'Dermatology',
    date: toLocalISO(tomorrow),
    dateLabel: 'Tomorrow',
    time: '11:00 AM',
    location: 'Nile Dermatology Clinic, Cairo',
    fee: 500,
    currency: 'EGP',
    status: 'confirmed',
    patientInfo: {
      fullName: 'Hala Samir',
      email: 'hala.s@example.com',
      phone: '+20 103 444 5566',
      dateOfBirth: '1992-11-08',
      gender: 'female',
      reason: 'Acne consultation',
      notes: 'First visit',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-apt-4',
    doctorId: 1,
    patientId: MOCK_PATIENT.id,
    doctorName: 'Dr. Sarah Ahmed',
    specialty: 'Dermatology',
    date: toLocalISO(yesterday),
    dateLabel: 'Yesterday',
    time: '09:30 AM',
    location: 'Nile Dermatology Clinic, Cairo',
    fee: 500,
    currency: 'EGP',
    status: 'completed',
    patientInfo: {
      ...demoPatientInfo,
      reason: 'Follow-up visit',
      notes: '',
    },
    createdAt: new Date().toISOString(),
  },
];
