import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bell, Menu } from 'lucide-react';
import Avatar from '../../common/Avatar/Avatar';
import { useAuth } from '../../../hooks/useAuth';
import { selectUnreadCountByRole } from '../../../features/notifications/notificationSelectors';
import { getPatientPageTitle } from '../../../utils/patientUtils';
import { getDoctorPageTitle } from '../../../utils/doctorUtils';
import { getAdminPageTitle } from '../../../utils/adminUtils';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';

const PatientHeader = ({ role = 'patient', onMenuClick }) => {
  const location = useLocation();
  const { user } = useAuth();
  const showNotifications = role === 'patient' || role === 'doctor';
  const unreadCount = useSelector(selectUnreadCountByRole(role));
  const pageTitle = role === 'admin'
    ? getAdminPageTitle(location.pathname)
    : role === 'doctor'
      ? getDoctorPageTitle(location.pathname)
      : getPatientPageTitle(location.pathname);
  const notificationsPath = role === 'doctor' ? '/doctor/notifications' : '/patient/notifications';

  return (
    <header className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          className="hidden max-[1024px]:inline-flex w-[42px] h-[42px] border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-md items-center justify-center cursor-pointer text-[var(--text-primary)]"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>
        <h1 className="text-[clamp(1.25rem,2.5vw,1.75rem)] text-[var(--text-primary)] tracking-[-0.02em]">
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {showNotifications && (
          <Link
            to={notificationsPath}
            className="relative w-[42px] h-[42px] border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-md grid place-items-center text-[var(--text-primary)] no-underline hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)]"
            aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--error)] text-white text-[11px] font-bold grid place-items-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>
        )}

        <div className="flex items-center gap-2.5">
          <Avatar name={user?.name || role} size={40} />
          <div className="leading-[1.2] max-[640px]:hidden">
            <span className="font-bold text-[var(--text-sm)] text-[var(--text-primary)] block">
              {user?.name}
            </span>
            <span className="text-xs text-[var(--text-muted)] capitalize block">
              {user?.role || role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
