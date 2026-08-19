export const getDashboardPath = (role) => {
  switch (role) {
    case 'doctor':
      return '/doctor/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/patient/dashboard';
  }
};

export const isPathAllowedForRole = (path, role) => {
  if (!path) return false;
  if (path.startsWith('/booking')) return true;
  if (role === 'patient') return path.startsWith('/patient');
  if (role === 'doctor') return path.startsWith('/doctor');
  if (role === 'admin') return path.startsWith('/admin');
  return false;
};

export const resolvePostLoginPath = (role, redirectPath) =>
  isPathAllowedForRole(redirectPath, role) ? redirectPath : getDashboardPath(role);
