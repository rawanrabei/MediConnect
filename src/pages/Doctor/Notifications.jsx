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
import { btn, doctorDashboard } from '../../constants/uiClasses';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:mt-2';
const notificationsToolbar = 'flex justify-end gap-2 flex-wrap';
const notificationsList = 'grid gap-4';

const DoctorNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotificationsByRole('doctor'));
  const loading = useSelector(selectNotificationsLoading);
  const unreadCount = useSelector(selectUnreadCountByRole('doctor'));

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={doctorDashboard}>
      <header className={pageIntro}>
        <p>Stay updated on new bookings, cancellations, and appointment reminders.</p>
      </header>

      {notifications.length > 0 && unreadCount > 0 && (
        <div className={notificationsToolbar}>
          <button
            type="button"
            className={btn('ghost', 'sm')}
            onClick={() => dispatch(markAllNotificationsRead('doctor'))}
          >
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
        <div className={notificationsList}>
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

export default DoctorNotifications;
