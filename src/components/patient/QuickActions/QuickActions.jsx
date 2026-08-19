import React from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Heart,
  Search,
  User,
} from 'lucide-react';
import { panel, panelHeader, quickAction, quickActions } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const ACTIONS = [
  { to: '/doctors', label: 'Find a Doctor', icon: Search },
  { to: '/patient/appointments', label: 'My Appointments', icon: CalendarDays },
  { to: '/patient/favorites', label: 'Favorite Doctors', icon: Heart },
  { to: '/patient/profile', label: 'My Profile', icon: User },
];

const QuickActions = () => {
  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Quick Actions</h3>
      </div>
      <div className={quickActions}>
        {ACTIONS.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className={cn(quickAction, '[&_svg]:text-[var(--text-accent)]')}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
