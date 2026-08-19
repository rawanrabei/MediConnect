import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Clock3,
  User,
  Users,
} from 'lucide-react';
import { panel, panelHeader, quickActions, quickAction } from '../../../constants/uiClasses';

const ACTIONS = [
  { to: '/doctor/appointments', label: 'Manage Appointments', icon: CalendarDays },
  { to: '/doctor/patients', label: 'View Patients', icon: Users },
  { to: '/doctor/availability', label: 'Manage Availability', icon: Clock3 },
  { to: '/doctor/profile', label: 'Edit Profile', icon: User },
];

const DoctorQuickActions = () => {
  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Quick Actions</h3>
      </div>
      <div className={quickActions}>
        {ACTIONS.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className={quickAction}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DoctorQuickActions;
