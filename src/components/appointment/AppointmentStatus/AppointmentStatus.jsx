import React from 'react';
import { cn } from '../../../utils/cn';

const STATUS_LABELS = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STATUS_COLORS = {
  confirmed: 'bg-[var(--success)] text-white',
  pending: 'bg-[var(--warning)] text-white',
  completed: 'bg-[var(--primary-600)] text-white',
  cancelled: 'bg-[var(--error)] text-white',
};

const AppointmentStatus = ({ status }) => {
  const normalized = status || 'pending';
  const label = STATUS_LABELS[normalized] || STATUS_LABELS.pending;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-[0.02em] capitalize',
        STATUS_COLORS[normalized] || STATUS_COLORS.pending,
      )}
      aria-label={`Status: ${label}`}
    >
      {label}
    </span>
  );
};

export default AppointmentStatus;
