export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const formatNotificationDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const getPatientPageTitle = (pathname) => {
  const titles = {
    '/patient/dashboard': 'Dashboard',
    '/patient/appointments': 'My Appointments',
    '/patient/favorites': 'Favorite Doctors',
    '/patient/notifications': 'Notifications',
    '/patient/profile': 'My Profile',
  };

  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/patient/appointments/')) return 'Appointment Details';
  return 'Patient Portal';
};
