import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_AVAILABILITY } from '../../data/mockDoctorPortal';

const doctorPortalSlice = createSlice({
  name: 'doctorPortal',
  initialState: {
    availabilityByDoctor: {},
    profileByDoctor: {},
  },
  reducers: {
    setDoctorAvailability: (state, action) => {
      const { doctorId, availability } = action.payload;
      state.availabilityByDoctor[doctorId] = availability;
    },
    updateDoctorProfile: (state, action) => {
      const { doctorId, profile } = action.payload;
      state.profileByDoctor[doctorId] = {
        ...(state.profileByDoctor[doctorId] || {}),
        ...profile,
      };
    },
    initializeDoctorAvailability: (state, action) => {
      const doctorId = action.payload;
      if (!state.availabilityByDoctor[doctorId]) {
        state.availabilityByDoctor[doctorId] = DEFAULT_AVAILABILITY;
      }
    },
  },
});

export const {
  setDoctorAvailability,
  updateDoctorProfile,
  initializeDoctorAvailability,
} = doctorPortalSlice.actions;

export default doctorPortalSlice.reducer;
