import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctors, fetchDoctorById } from './doctorThunks';

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: {
    list: [],
    favoriteIds: [],
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.favoriteIds.indexOf(id);
      if (index >= 0) {
        state.favoriteIds.splice(index, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
    clearDoctorsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.fetched = true;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((doctor) => String(doctor.id) === String(action.payload.id));
        if (index >= 0) {
          state.list[index] = action.payload;
        } else {
          state.list.push(action.payload);
        }
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleFavorite, clearDoctorsError } = doctorSlice.actions;

export default doctorSlice.reducer;
