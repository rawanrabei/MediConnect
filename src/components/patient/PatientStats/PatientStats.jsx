import React from 'react';
import { CalendarCheck, CalendarX, Heart, Clock3 } from 'lucide-react';
import { patientStats, statCard, statValueLg } from '../../../constants/uiClasses';

const STAT_CONFIG = [
  { key: 'upcoming', label: 'Upcoming Appointments', icon: Clock3 },
  { key: 'completed', label: 'Completed Appointments', icon: CalendarCheck },
  { key: 'cancelled', label: 'Cancelled Appointments', icon: CalendarX },
  { key: 'favorites', label: 'Favorite Doctors', icon: Heart },
];

const PatientStats = ({ stats }) => {
  return (
    <section className={patientStats} aria-label="Patient statistics">
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

export default PatientStats;
