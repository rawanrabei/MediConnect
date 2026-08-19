import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PENDING_DOCTOR_IDS } from '../../data/mockAdminData';

const initialDoctorStatuses = DEFAULT_PENDING_DOCTOR_IDS.reduce((acc, doctorId) => {
  acc[doctorId] = 'pending';
  return acc;
}, {});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    userStatuses: {},
    doctorStatuses: initialDoctorStatuses,
    loading: false,
    error: null,
  },
  reducers: {
    suspendUser: (state, action) => {
      state.userStatuses[action.payload] = 'suspended';
    },
    activateUser: (state, action) => {
      state.userStatuses[action.payload] = 'active';
    },
    approveDoctor: (state, action) => {
      state.doctorStatuses[action.payload] = 'approved';
    },
    suspendDoctor: (state, action) => {
      state.doctorStatuses[action.payload] = 'suspended';
    },
    setAdminLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAdminError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  suspendUser,
  activateUser,
  approveDoctor,
  suspendDoctor,
  setAdminLoading,
  setAdminError,
} = adminSlice.actions;

export default adminSlice.reducer;
