import React from 'react';
import { CalendarCheck, CalendarClock, CalendarX, Users } from 'lucide-react';
import { doctorStats, statCard, statValueLg } from '../../../constants/uiClasses';

const STAT_CONFIG = [
  { key: 'today', label: "Today's Appointments", icon: CalendarClock },
  { key: 'upcoming', label: 'Upcoming Appointments', icon: CalendarCheck },
  { key: 'completed', label: 'Completed Appointments', icon: CalendarCheck },
  { key: 'totalPatients', label: 'Total Patients', icon: Users },
];

const DoctorStats = ({ stats }) => {
  return (
    <section className={doctorStats} aria-label="Doctor statistics">
      {STAT_CONFIG.map(({ key, label, icon: Icon }) => (
        <article key={key} className={statCard}>
          <h3>{label}</h3>
          <p className={statValueLg}>{stats[key] ?? 0}</p>
          <Icon size={18} aria-hidden="true" style={{ color: 'var(--primary-600)', marginTop: '8px' }} />
        </article>
      ))}
    </section>
  );
};

export default DoctorStats;
