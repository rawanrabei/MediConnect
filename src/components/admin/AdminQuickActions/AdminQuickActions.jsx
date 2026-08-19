import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  CalendarDays,
  Stethoscope,
  UserRound,
  Users,
} from 'lucide-react';
import { panel, panelHeader, quickActions, quickAction } from '../../../constants/uiClasses';

const ACTIONS = [
  { to: '/admin/users', label: 'Manage Users', icon: Users },
  { to: '/admin/doctors', label: 'Manage Doctors', icon: Stethoscope },
  { to: '/admin/patients', label: 'Manage Patients', icon: UserRound },
  { to: '/admin/appointments', label: 'Manage Appointments', icon: CalendarDays },
  { to: '/admin/analytics', label: 'View Analytics', icon: BarChart3 },
];

const AdminQuickActions = () => (
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

export default AdminQuickActions;
