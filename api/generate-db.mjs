import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mockDoctors } from '../src/data/doctors.js';
import { seedAppointments } from '../src/data/seedAppointments.js';
import { mockNotifications } from '../src/data/mockNotifications.js';
import { mockDoctorNotifications } from '../src/data/mockDoctorPortal.js';
import { specialties } from '../src/data/specialties.js';
import { MOCK_PATIENT, MOCK_DOCTOR_USER, MOCK_ADMIN_USER } from '../src/data/mockAuth.js';

const users = [
  {
    ...MOCK_PATIENT,
    password: 'password',
    status: 'active',
    createdAt: '2026-02-10T09:00:00.000Z',
  },
  {
    ...MOCK_DOCTOR_USER,
    password: 'password',
    status: 'active',
    createdAt: '2026-03-01T08:00:00.000Z',
  },
  {
    ...MOCK_ADMIN_USER,
    password: 'password',
    status: 'active',
    createdAt: '2026-01-15T10:00:00.000Z',
  },
];

const db = {
  users,
  doctors: mockDoctors,
  appointments: seedAppointments,
  notifications: [...mockDoctorNotifications, ...mockNotifications],
  specialties,
};

const outputPath = join(dirname(fileURLToPath(import.meta.url)), 'db.json');
writeFileSync(outputPath, JSON.stringify(db, null, 2));
console.log(`Generated ${outputPath}`);
