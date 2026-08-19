import { createAsyncThunk } from '@reduxjs/toolkit';
import doctorService from '../../services/doctorService';

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await doctorService.getDoctors();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load doctors');
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      return await doctorService.getDoctorById(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Doctor not found');
    }
  }
);
