import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HeartPulse, Menu, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { logoutUser } from '../../../features/auth/authThunks';
import { getDashboardPath } from '../../../utils/getDashboardPath';
import Avatar from '../../common/Avatar/Avatar';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';
import { btnGhost, btnOutline, btnPrimary, btnSm, container } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Find Doctors', to: '/doctors' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'About', to: '/#about' },
];

const navLinkClass =
  'no-underline text-[var(--text-secondary)] font-medium px-3 py-2 rounded-md transition-[color,background-color] duration-150 hover:text-[var(--text-accent)] hover:bg-[var(--primary-50)]';

const navLinkActiveClass = 'text-[var(--text-accent)] bg-[var(--primary-50)]';

const Navbar = () => {
  const { isAuthenticated, user, role } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setMenuOpen(false);
    navigate('/');
  };

  const dashboardPath = getDashboardPath(role);
  const displayName = user?.name || user?.email || 'Account';

  const renderLinks = (className = 'flex items-center gap-1 list-none max-[900px]:hidden') => (
    <ul className={className}>
      {NAV_LINKS.map((link) => {
        const isHash = link.to.includes('#');
        if (isHash) {
          return (
            <li key={link.label}>
              <Link className={navLinkClass} to={link.to}>
                {link.label}
              </Link>
            </li>
          );
        }

        return (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className={({ isActive }) => cn(navLinkClass, isActive && navLinkActiveClass)}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  const renderAuthActions = (isMobile = false) => {
    const wrapperClass = isMobile
      ? 'grid gap-2 [&_a]:w-full [&_button]:w-full'
      : 'flex items-center gap-2 max-[900px]:hidden';

    if (isAuthenticated) {
      return (
        <div className={wrapperClass}>
          {!isMobile && <ThemeToggle />}
          {!isMobile && (
            <div className="flex items-center gap-2.5 mr-1">
              <Avatar name={displayName} size={36} />
              <div className="flex flex-col leading-[1.2]">
                <span className="font-bold text-[var(--text-sm)] text-[var(--text-primary)]">
                  {displayName}
                </span>
                {role && (
                  <span className="text-xs text-[var(--text-muted)] capitalize">{role}</span>
                )}
              </div>
            </div>
          )}
          <Link to={dashboardPath} className={cn(btnGhost, btnSm)}>
            Dashboard
          </Link>
          <button type="button" className={cn(btnOutline, btnSm)} onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className={wrapperClass}>
        {!isMobile && <ThemeToggle />}
        <Link to="/login" className={cn(btnGhost, btnSm)}>
          Login
        </Link>
        <Link to="/register" className={cn(btnPrimary, btnSm)}>
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-[1000] bg-[var(--navbar-bg)] backdrop-blur-[10px] border-b border-[var(--border-subtle)]">
      <div className={cn(container, 'min-h-navbar flex items-center justify-between gap-6')}>
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 no-underline text-[var(--text-primary)] font-extrabold text-[1.2rem] tracking-[-0.03em] shrink-0"
          aria-label="MediConnect home"
        >
          <span
            className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-[var(--accent-sky)] to-[var(--accent-mint)] text-white grid place-items-center shadow-[0_8px_16px_-8px_rgba(14,165,233,0.8)]"
            aria-hidden="true"
          >
            <HeartPulse size={20} />
          </span>
          MediConnect
        </Link>

        <nav aria-label="Primary">{renderLinks()}</nav>
        {renderAuthActions(false)}

        <button
          type="button"
          className="hidden max-[900px]:inline-flex w-[42px] h-[42px] border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-md text-[var(--text-primary)] cursor-pointer items-center justify-center"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="hidden max-[900px]:block border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] py-4 pb-6"
        >
          <div className={container}>
            {isAuthenticated && (
              <div className="flex items-center gap-3 py-2 pb-3">
                <Avatar name={displayName} size={40} />
                <div className="flex flex-col leading-[1.2]">
                  <span className="font-bold text-[var(--text-sm)] text-[var(--text-primary)]">
                    {displayName}
                  </span>
                  {role && (
                    <span className="text-xs text-[var(--text-muted)] capitalize">{role}</span>
                  )}
                </div>
              </div>
            )}
            <nav aria-label="Mobile">
              {renderLinks('list-none grid gap-1 mb-4 [&_a]:block [&_a]:py-3 [&_a]:px-1')}
            </nav>
            <div className="flex justify-start my-4">
              <ThemeToggle />
            </div>
            {renderAuthActions(true)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
