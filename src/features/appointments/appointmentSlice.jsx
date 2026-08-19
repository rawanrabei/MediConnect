import { createSlice } from '@reduxjs/toolkit';
import { deriveBookedSlots } from '../../utils/appointmentUtils';
import {
  fetchAppointments,
  createAppointment,
  patchAppointmentStatus,
} from './appointmentThunks';

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    selectedAppointment: null,
    bookedSlots: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    selectAppointment: (state, action) => {
      state.selectedAppointment = action.payload;
    },
    clearSelectedAppointment: (state) => {
      state.selectedAppointment = null;
    },
    clearAppointmentError: (state) => {
      state.error = null;
    },
    setAppointmentError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
        state.bookedSlots = deriveBookedSlots(action.payload);
        state.fetched = true;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
        state.selectedAppointment = action.payload;
        state.bookedSlots = deriveBookedSlots(state.appointments);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(patchAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.appointments.findIndex(
          (item) => String(item.id) === String(action.payload.id)
        );
        if (index >= 0) {
          state.appointments[index] = action.payload;
        }
        state.bookedSlots = deriveBookedSlots(state.appointments);
      })
      .addCase(patchAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  selectAppointment,
  clearSelectedAppointment,
  clearAppointmentError,
  setAppointmentError,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
