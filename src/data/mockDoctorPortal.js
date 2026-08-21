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
  {
    id: 'doc-notif-3',
    role: 'doctor',
    type: 'appointment_reminder',
    title: 'New booking request',
    message: 'A patient requested a dermatology slot. Review and confirm pending appointments.',
    date: '2026-08-18T07:00:00.000Z',
    read: false,
  },
  {
    id: 'doc-notif-4',
    role: 'doctor',
    type: 'system',
    title: 'Weekly summary ready',
    message: 'Your clinic summary for this week is available on the doctor dashboard.',
    date: '2026-08-15T18:00:00.000Z',
    read: true,
  },
  {
    id: 'doc-notif-5',
    role: 'doctor',
    type: 'appointment_reminder',
    title: 'Tomorrow schedule',
    message: 'You have multiple confirmed visits tomorrow morning. Check patient notes in advance.',
    date: '2026-08-17T20:00:00.000Z',
    read: false,
  },
];
