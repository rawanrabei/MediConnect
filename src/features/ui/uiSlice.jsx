import { createSlice } from '@reduxjs/toolkit';
import { getStoredTheme } from '../../utils/theme';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: false,
    modalOpen: false,
    modalContent: null,
    theme: getStoredTheme(),
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.modalContent = action.payload;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.modalContent = null;
    },
    setTheme: (state, action) => {
      state.theme = action.payload === 'dark' ? 'dark' : 'light';
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openModal,
  closeModal,
  setTheme,
  toggleTheme,
  setSidebarOpen,
} = uiSlice.actions;

export default uiSlice.reducer;
