import { createAsyncThunk } from '@reduxjs/toolkit';
import appointmentService from '../../services/appointmentService';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await appointmentService.getAppointments();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await appointmentService.bookAppointment(payload);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to book appointment');
    }
  }
);

export const patchAppointmentStatus = createAsyncThunk(
  'appointments/patchStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      return await appointmentService.updateAppointmentStatus(id, status);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update appointment');
    }
  }
);
