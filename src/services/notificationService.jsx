import api from './api';

const buildQuery = (params = {}) => {
  const entries = Object.entries(params).filter(([, value]) => value != null && value !== '');
  if (!entries.length) return '';
  return `?${new URLSearchParams(entries).toString()}`;
};

export const notificationService = {
  getNotifications: async (params) => {
    const response = await api.get(`/notifications${buildQuery(params)}`);
    return response.data;
  },
  createNotification: async (payload) => {
    const response = await api.post('/notifications', payload);
    return response.data;
  },
  markAsRead: async (notificationId) => {
    const response = await api.patch(`/notifications/${notificationId}`, { read: true });
    return response.data;
  },
  markAllAsRead: async (role) => {
    const notifications = await notificationService.getNotifications(
      role ? { role } : undefined
    );
    await Promise.all(
      notifications
        .filter((item) => !item.read && (!role || item.role === role))
        .map((item) => notificationService.markAsRead(item.id))
    );
    return notifications.map((item) =>
      !role || item.role === role ? { ...item, read: true } : item
    );
  },
};

export default notificationService;
