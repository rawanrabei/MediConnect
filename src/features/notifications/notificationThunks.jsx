import { createAsyncThunk } from '@reduxjs/toolkit';
import notificationService from '../../services/notificationService';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await notificationService.getNotifications();
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to load notifications');
    }
  }
);

export const createNotification = createAsyncThunk(
  'notifications/create',
  async (payload, { rejectWithValue }) => {
    try {
      return await notificationService.createNotification(payload);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create notification');
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  'notifications/markRead',
  async (id, { rejectWithValue }) => {
    try {
      return await notificationService.markAsRead(id);
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update notification');
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  'notifications/markAllRead',
  async (role, { rejectWithValue }) => {
    try {
      await notificationService.markAllAsRead(role);
      return role;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update notifications');
    }
  }
);
