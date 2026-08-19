export const selectDoctorAvailability = (doctorId) => (state) =>
  state.doctorPortal.availabilityByDoctor[doctorId];

export const selectDoctorProfileOverride = (doctorId) => (state) =>
  state.doctorPortal.profileByDoctor[doctorId] || {};
