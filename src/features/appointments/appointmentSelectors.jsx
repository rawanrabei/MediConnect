export const selectAppointments = (state) => state.appointments.appointments;
export const selectSelectedAppointment = (state) => state.appointments.selectedAppointment;
export const selectAppointmentsLoading = (state) => state.appointments.loading;
export const selectAppointmentsError = (state) => state.appointments.error;
export const selectBookedSlots = (state) => state.appointments.bookedSlots;

export const selectAppointmentById = (id) => (state) =>
  state.appointments.appointments.find((appointment) => String(appointment.id) === String(id));

export const selectPatientAppointments = (patientId) => (state) =>
  state.appointments.appointments.filter(
    (appointment) => String(appointment.patientId) === String(patientId)
  );

export const selectDoctorAppointments = (doctorId) => (state) =>
  state.appointments.appointments.filter(
    (appointment) => String(appointment.doctorId) === String(doctorId)
  );

export const selectDoctorAppointmentById = (doctorId, appointmentId) => (state) => {
  const appointment = selectAppointmentById(appointmentId)(state);
  if (!appointment || String(appointment.doctorId) !== String(doctorId)) return null;
  return appointment;
};

export const selectIsSlotBooked = (doctorId, date, time) => (state) =>
  state.appointments.bookedSlots.some(
    (slot) =>
      String(slot.doctorId) === String(doctorId) &&
      slot.date === date &&
      slot.time === time
  );

export const selectHasDuplicateBooking = (doctorId, date, time, patientId) => (state) =>
  state.appointments.appointments.some(
    (appointment) =>
      String(appointment.patientId) === String(patientId) &&
      String(appointment.doctorId) === String(doctorId) &&
      appointment.date === date &&
      appointment.time === time &&
      appointment.status !== 'cancelled'
  );
