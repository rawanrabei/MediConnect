import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Bell,
  CalendarDays,
  Heart,
  LayoutDashboard,
  LogOut,
  Search,
  User,
} from 'lucide-react';
import { logoutUser } from '../../../features/auth/authThunks';
import { setSidebarOpen } from '../../../features/ui/uiSlice';
import { cn } from '../../../utils/cn';

const ICONS = {
  LayoutDashboard,
  Search,
  CalendarDays,
  Heart,
  Bell,
  User,
};

const sidebarLinkClass =
  'flex items-center gap-2.5 text-[#cbd5e1] no-underline px-3 py-2.5 rounded-md font-medium text-[var(--text-sm)] transition-[background-color,color] duration-150 hover:bg-[rgba(255,255,255,0.08)] hover:text-white';

const sidebarLinkActiveClass = 'bg-[var(--primary-600)] text-white';

const Sidebar = ({ role, isOpen, onNavigate }) => {
  const dispatch = useDispatch();

  const patientLinks = [
    { path: '/patient/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/doctors', label: 'Find Doctors', icon: 'Search' },
    { path: '/patient/appointments', label: 'Appointments', icon: 'CalendarDays' },
    { path: '/patient/favorites', label: 'Favorites', icon: 'Heart' },
    { path: '/patient/notifications', label: 'Notifications', icon: 'Bell' },
    { path: '/patient/profile', label: 'Profile', icon: 'User' },
  ];

  const doctorLinks = [
    { path: '/doctor/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/doctor/appointments', label: 'Appointments', icon: 'CalendarDays' },
    { path: '/doctor/patients', label: 'Patients', icon: 'User' },
    { path: '/doctor/availability', label: 'Availability', icon: 'CalendarDays' },
    { path: '/doctor/profile', label: 'Profile', icon: 'User' },
  ];

  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/admin/users', label: 'Users', icon: 'User' },
    { path: '/admin/doctors', label: 'Doctors', icon: 'Search' },
    { path: '/admin/patients', label: 'Patients', icon: 'User' },
    { path: '/admin/appointments', label: 'Appointments', icon: 'CalendarDays' },
    { path: '/admin/analytics', label: 'Analytics', icon: 'LayoutDashboard' },
  ];

  const links = role === 'doctor' ? doctorLinks : role === 'admin' ? adminLinks : patientLinks;

  const handleNav = () => {
    onNavigate?.();
    dispatch(setSidebarOpen(false));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="hidden max-[1024px]:block fixed inset-0 bg-[rgba(15,23,42,0.45)] z-[90] border-none cursor-pointer"
          aria-label="Close navigation menu"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}
      <aside
        className={cn(
          'w-[260px] bg-[var(--navy)] text-white flex flex-col shrink-0 min-h-screen sticky top-0 z-[100]',
          'max-[1024px]:fixed max-[1024px]:left-0 max-[1024px]:top-0 max-[1024px]:-translate-x-full max-[1024px]:transition-transform max-[1024px]:duration-[220ms] max-[1024px]:shadow-xl',
          isOpen && 'max-[1024px]:translate-x-0',
        )}
        aria-label="Dashboard navigation"
      >
        <div className="px-6 py-8 border-b border-[rgba(255,255,255,0.1)] [&_a]:text-white [&_a]:no-underline [&_a]:font-extrabold [&_a]:text-[1.15rem] [&_a]:tracking-[-0.02em]">
          <Link to="/" onClick={handleNav}>
            MediConnect
          </Link>
        </div>
        <nav className="flex-1 p-6">
          <ul className="list-none grid gap-1">
            {links.map((link) => {
              const Icon = ICONS[link.icon] || LayoutDashboard;
              const isExternalPatientLink = link.path === '/doctors';

              return (
                <li key={link.path}>
                  {isExternalPatientLink ? (
                    <Link
                      to={link.path}
                      className={sidebarLinkClass}
                      onClick={handleNav}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {link.label}
                    </Link>
                  ) : (
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn(sidebarLinkClass, isActive && sidebarLinkActiveClass)
                      }
                      onClick={handleNav}
                      end={link.path.endsWith('/dashboard')}
                    >
                      <Icon size={18} aria-hidden="true" />
                      {link.label}
                    </NavLink>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-6 border-t border-[rgba(255,255,255,0.1)]">
          <button
            type="button"
            className={cn(sidebarLinkClass, 'w-full border-none bg-transparent cursor-pointer')}
            onClick={handleLogout}
          >
            <LogOut size={18} aria-hidden="true" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
