import { createSlice } from '@reduxjs/toolkit';
import {
  fetchNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
} from './notificationThunks';

const countUnread = (notifications) =>
  notifications.filter((notification) => !notification.read).length;

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
    fetched: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.unreadCount = countUnread(action.payload);
        state.fetched = true;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
        if (!action.payload.read) {
          state.unreadCount += 1;
        }
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (item) => String(item.id) === String(action.payload.id)
        );
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllNotificationsRead.fulfilled, (state, action) => {
        const role = action.payload;
        state.notifications.forEach((notification) => {
          if (!role || notification.role === role) {
            notification.read = true;
          }
        });
        state.unreadCount = countUnread(state.notifications);
      });
  },
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
