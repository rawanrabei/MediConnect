export const DOCTOR_WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const DEFAULT_AVAILABILITY = {
  appointmentDuration: 30,
  breakMinutes: 15,
  schedule: [
    { day: 'Monday', enabled: true, startTime: '09:00', endTime: '16:00' },
    { day: 'Tuesday', enabled: true, startTime: '09:00', endTime: '16:00' },
    { day: 'Wednesday', enabled: false, startTime: '09:00', endTime: '16:00' },
    { day: 'Thursday', enabled: true, startTime: '09:00', endTime: '16:00' },
    { day: 'Friday', enabled: true, startTime: '09:00', endTime: '14:00' },
    { day: 'Saturday', enabled: false, startTime: '09:00', endTime: '13:00' },
    { day: 'Sunday', enabled: false, startTime: '09:00', endTime: '13:00' },
  ],
};

export const mockDoctorNotifications = [
  {
    id: 'doc-notif-1',
    role: 'doctor',
    type: 'appointment_reminder',
    title: 'Upcoming clinic hours',
    message: 'You have appointments scheduled for today. Review your schedule in Appointments.',
    date: '2026-08-17T08:00:00.000Z',
    read: false,
  },
  {
    id: 'doc-notif-2',
    role: 'doctor',
    type: 'system',
    title: 'Availability updated',
    message: 'Your weekly availability is active for patient booking this session.',
    date: '2026-08-16T12:00:00.000Z',
    read: false,
  },
];
