import { APPOINTMENT_STATUSES, parseAppointmentDateTime } from './appointmentUtils';

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const getAdminPageTitle = (pathname) => {
  const titles = {
    '/admin/dashboard': 'Dashboard',
    '/admin/users': 'Users',
    '/admin/doctors': 'Doctors',
    '/admin/patients': 'Patients',
    '/admin/appointments': 'Appointments',
    '/admin/analytics': 'Analytics',
  };

  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/admin/appointments/')) return 'Appointment Details';
  return 'Admin Portal';
};

export const formatCreatedDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const filterUsers = (users, { role, search }) => {
  let filtered = [...users];

  if (role && role !== 'all') {
    filtered = filtered.filter((user) => user.role === role);
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
};

export const filterDoctors = (doctors, { status, search, specialty }) => {
  let filtered = [...doctors];

  if (status && status !== 'all') {
    filtered = filtered.filter((doctor) => doctor.status === status);
  }

  if (specialty && specialty !== 'all') {
    filtered = filtered.filter((doctor) => doctor.specialty === specialty);
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.location.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
};

export const filterPatients = (patients, { status, search }) => {
  let filtered = [...patients];

  if (status && status !== 'all') {
    filtered = filtered.filter((patient) => patient.status === status);
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query)
    );
  }

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
};

export const filterAdminAppointments = (appointments, { status, search, sort }) => {
  let filtered = [...appointments];

  if (status && status !== 'all') {
    filtered = filtered.filter((appointment) => appointment.status === status);
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter((appointment) => {
      const patientName = appointment.patientInfo?.fullName?.toLowerCase() || '';
      const doctorName = appointment.doctorName?.toLowerCase() || '';
      return (
        patientName.includes(query) ||
        doctorName.includes(query) ||
        String(appointment.id).toLowerCase().includes(query)
      );
    });
  }

  if (sort === 'time') {
    filtered.sort((a, b) => a.time.localeCompare(b.time));
  } else if (sort === 'status') {
    filtered.sort((a, b) => a.status.localeCompare(b.status));
  } else {
    filtered.sort(
      (a, b) => parseAppointmentDateTime(a.date, a.time) - parseAppointmentDateTime(b.date, b.time)
    );
  }

  return filtered;
};

export const getAppointmentStatusCounts = (appointments) => ({
  all: appointments.length,
  pending: appointments.filter((a) => a.status === APPOINTMENT_STATUSES.PENDING).length,
  confirmed: appointments.filter((a) => a.status === APPOINTMENT_STATUSES.CONFIRMED).length,
  completed: appointments.filter((a) => a.status === APPOINTMENT_STATUSES.COMPLETED).length,
  cancelled: appointments.filter((a) => a.status === APPOINTMENT_STATUSES.CANCELLED).length,
});
