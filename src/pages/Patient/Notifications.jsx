import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bell } from 'lucide-react';
import NotificationItem from '../../components/patient/NotificationItem/NotificationItem';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import {
  markAllNotificationsRead,
  markNotificationRead,
} from '../../features/notifications/notificationThunks';
import {
  selectNotificationsByRole,
  selectNotificationsLoading,
  selectUnreadCountByRole,
} from '../../features/notifications/notificationSelectors';
import { btn, supportText } from '../../constants/uiClasses';

const Notifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotificationsByRole('patient'));
  const loading = useSelector(selectNotificationsLoading);
  const unreadCount = useSelector(selectUnreadCountByRole('patient'));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid gap-8">
      <header>
        <p className={supportText}>Stay updated on appointments and important platform messages.</p>
      </header>

      {notifications.length > 0 && unreadCount > 0 && (
        <div className="flex justify-end gap-2 flex-wrap">
          <button type="button" className={btn('ghost', 'sm')} onClick={() => dispatch(markAllNotificationsRead('patient'))}>
            Mark All as Read
          </button>
        </div>
      )}

      {notifications.length === 0 ? (
        <EmptyState
          icon={<Bell size={36} />}
          title="No notifications"
          description="You're all caught up. New updates will appear here."
        />
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={(id) => dispatch(markNotificationRead(id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
