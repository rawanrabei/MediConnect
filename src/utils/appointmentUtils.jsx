export const APPOINTMENT_STATUSES = {
  CONFIRMED: 'confirmed',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const createAppointmentId = () =>
  `apt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const formatAppointmentDate = (date) => {
  if (!date) return '';
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const parseAppointmentDateTime = (date, time) => {
  const match = time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return new Date(`${date}T12:00:00`);

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  const parsed = new Date(`${date}T00:00:00`);
  parsed.setHours(hours, minutes, 0, 0);
  return parsed;
};

export const deriveBookedSlots = (appointments) =>
  appointments
    .filter((appointment) => appointment.status !== APPOINTMENT_STATUSES.CANCELLED)
    .map((appointment) => ({
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
    }));

export const countCompletedAppointments = (appointments) =>
  appointments.filter((appointment) => appointment.status === APPOINTMENT_STATUSES.COMPLETED).length;

export const categorizeAppointments = (appointments) => {
  const now = new Date();

  const upcoming = [];
  const past = [];
  const cancelled = [];
  const completed = [];

  appointments.forEach((appointment) => {
    if (appointment.status === APPOINTMENT_STATUSES.CANCELLED) {
      cancelled.push(appointment);
      return;
    }

    if (appointment.status === APPOINTMENT_STATUSES.COMPLETED) {
      completed.push(appointment);
      past.push(appointment);
      return;
    }

    const appointmentDate = parseAppointmentDateTime(appointment.date, appointment.time);

    if (appointmentDate < now) {
      past.push(appointment);
      return;
    }

    upcoming.push(appointment);
  });

  const byDateAsc = (a, b) =>
    parseAppointmentDateTime(a.date, a.time) - parseAppointmentDateTime(b.date, b.time);
  const byDateDesc = (a, b) => byDateAsc(b, a);

  return {
    upcoming: upcoming.sort(byDateAsc),
    past: past.sort(byDateDesc),
    completed: completed.sort(byDateDesc),
    cancelled: cancelled.sort(byDateDesc),
  };
};

export const isSlotUnavailable = (bookedSlots, doctorId, date, time) =>
  bookedSlots.some(
    (slot) =>
      String(slot.doctorId) === String(doctorId) &&
      slot.date === date &&
      slot.time === time
  );
