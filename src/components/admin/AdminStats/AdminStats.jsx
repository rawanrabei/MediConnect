import React from 'react';
import {
  CalendarCheck,
  CalendarClock,
  CalendarX,
  Stethoscope,
  Users,
  UserRound,
} from 'lucide-react';
import { adminStats, statCard, statValue } from '../../../constants/uiClasses';

const STAT_CONFIG = [
  { key: 'totalPatients', label: 'Total Patients', icon: Users },
  { key: 'totalDoctors', label: 'Total Doctors', icon: Stethoscope },
  { key: 'totalAppointments', label: 'Total Appointments', icon: CalendarClock },
  { key: 'pendingConfirmedAppointments', label: 'Pending / Confirmed', icon: CalendarCheck },
  { key: 'completedAppointments', label: 'Completed Appointments', icon: CalendarCheck },
  { key: 'cancelledAppointments', label: 'Cancelled Appointments', icon: CalendarX },
];

const AdminStats = ({ stats }) => (
  <section className={adminStats} aria-label="Platform statistics">
    {STAT_CONFIG.map(({ key, label, icon: Icon }) => (
      <article key={key} className={statCard}>
        <h3>{label}</h3>
        <p className={statValue}>{stats[key] ?? 0}</p>
        <Icon size={18} aria-hidden="true" style={{ color: 'var(--primary-600)', marginTop: '8px' }} />
      </article>
    ))}
  </section>
);

export default AdminStats;
