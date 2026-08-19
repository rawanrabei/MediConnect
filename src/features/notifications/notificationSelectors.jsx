export const selectNotifications = (state) => state.notifications.notifications;
export const selectUnreadCount = (state) => state.notifications.unreadCount;
export const selectNotificationsLoading = (state) => state.notifications.loading;

export const selectNotificationsByRole = (role) => (state) =>
  state.notifications.notifications.filter(
    (notification) => notification.role === role || (!notification.role && role === 'patient')
  );

export const selectUnreadCountByRole = (role) => (state) =>
  selectNotificationsByRole(role)(state).filter((notification) => !notification.read).length;
