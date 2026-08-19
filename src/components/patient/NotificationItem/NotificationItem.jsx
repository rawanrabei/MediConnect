import React from 'react';
import {
  Bell,
  CalendarCheck,
  CalendarX,
  Clock3,
  Info,
} from 'lucide-react';
import { btnGhost, btnSm } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';
import { formatNotificationDate } from '../../../utils/patientUtils';

const TYPE_ICONS = {
  appointment_confirmed: CalendarCheck,
  appointment_cancelled: CalendarX,
  appointment_reminder: Clock3,
  system: Info,
};

const NotificationItem = ({ notification, onMarkRead }) => {
  const Icon = TYPE_ICONS[notification.type] || Bell;

  return (
    <article
      className={cn(
        'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-6 grid grid-cols-[auto_1fr_auto] gap-4 items-start max-[900px]:grid-cols-[auto_1fr]',
        !notification.read && 'border-[var(--primary-200)] bg-[var(--primary-50)]',
      )}
    >
      <div
        className="w-10 h-10 rounded-[10px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-accent)]"
        aria-hidden="true"
      >
        <Icon size={18} />
      </div>
      <div>
        <h3 className="text-base mb-1 text-[var(--text-primary)]">{notification.title}</h3>
        <p className="text-[var(--text-secondary)] text-[var(--text-sm)]">{notification.message}</p>
      </div>
      <div className="flex flex-col items-end gap-2 max-[900px]:col-span-full max-[900px]:flex-row max-[900px]:justify-between max-[900px]:items-center">
        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
          {formatNotificationDate(notification.date)}
        </span>
        {!notification.read && (
          <button
            type="button"
            className={cn(btnGhost, btnSm)}
            onClick={() => onMarkRead(notification.id)}
          >
            Mark as Read
          </button>
        )}
      </div>
    </article>
  );
};

export default NotificationItem;
