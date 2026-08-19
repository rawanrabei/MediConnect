import {
  APPOINTMENT_STATUSES,
  categorizeAppointments,
  parseAppointmentDateTime,
} from './appointmentUtils';

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export const getDoctorPageTitle = (pathname) => {
  const titles = {
    '/doctor/dashboard': 'Dashboard',
    '/doctor/appointments': 'Appointments',
    '/doctor/patients': 'Patients',
    '/doctor/availability': 'Availability',
    '/doctor/profile': 'Profile',
    '/doctor/notifications': 'Notifications',
  };

  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/doctor/appointments/')) return 'Appointment Details';
  if (pathname.startsWith('/doctor/patients/')) return 'Patient Details';
  return 'Doctor Portal';
};

export const isSameDay = (dateString, reference = new Date()) => {
  const date = new Date(`${dateString}T00:00:00`);
  return (
    date.getFullYear() === reference.getFullYear() &&
    date.getMonth() === reference.getMonth() &&
    date.getDate() === reference.getDate()
  );
};

export const getDoctorDashboardStats = (appointments) => {
  const { upcoming, cancelled } = categorizeAppointments(appointments);
  const today = appointments.filter(
    (appointment) =>
      appointment.status !== APPOINTMENT_STATUSES.CANCELLED &&
      isSameDay(appointment.date)
  );

  const completed = appointments.filter(
    (appointment) => appointment.status === APPOINTMENT_STATUSES.COMPLETED
  ).length;

  const patientIds = new Set(
    appointments
      .filter((appointment) => appointment.status !== APPOINTMENT_STATUSES.CANCELLED)
      .map((appointment) => appointment.patientId)
  );

  return {
    today: today.length,
    upcoming: upcoming.length,
    completed,
    cancelled: cancelled.length,
    totalPatients: patientIds.size,
    chartData: [
      { name: 'Upcoming', value: upcoming.length, fill: 'var(--primary-600)' },
      { name: 'Completed', value: completed, fill: 'var(--success)' },
      { name: 'Cancelled', value: cancelled.length, fill: 'var(--error)' },
    ],
  };
};

export const getUniqueDoctorPatients = (appointments) => {
  const map = new Map();

  appointments.forEach((appointment) => {
    const key = String(appointment.patientId);
    const existing = map.get(key) || {
      patientId: appointment.patientId,
      name: appointment.patientInfo?.fullName || 'Patient',
      email: appointment.patientInfo?.email || '—',
      phone: appointment.patientInfo?.phone || '—',
      appointments: [],
    };
    existing.appointments.push(appointment);
    map.set(key, existing);
  });

  return [...map.values()].map((patient) => {
    const sorted = [...patient.appointments].sort(
      (a, b) => parseAppointmentDateTime(b.date, b.time) - parseAppointmentDateTime(a.date, a.time)
    );
    const { upcoming, past } = categorizeAppointments(patient.appointments);
    const last = sorted[0];

    return {
      ...patient,
      totalAppointments: patient.appointments.length,
      lastAppointment: last,
      upcomingAppointment: upcoming[0] || null,
      status: upcoming.length > 0 ? 'active' : past.length > 0 ? 'inactive' : 'new',
    };
  });
};

export const filterDoctorAppointments = (appointments, { filter, search, sort }) => {
  const now = new Date();
  let filtered = [...appointments];

  if (filter === 'today') {
    filtered = filtered.filter(
      (appointment) =>
        appointment.status !== APPOINTMENT_STATUSES.CANCELLED && isSameDay(appointment.date, now)
    );
  } else if (filter === 'upcoming') {
    filtered = categorizeAppointments(filtered).upcoming;
  } else if (filter === 'completed') {
    filtered = filtered.filter(
      (appointment) => appointment.status === APPOINTMENT_STATUSES.COMPLETED
    );
  } else if (filter === 'cancelled') {
    filtered = categorizeAppointments(filtered).cancelled;
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter((appointment) => {
      const patientName = appointment.patientInfo?.fullName?.toLowerCase() || '';
      return (
        patientName.includes(query) ||
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
