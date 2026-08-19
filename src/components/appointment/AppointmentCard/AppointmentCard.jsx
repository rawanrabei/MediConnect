import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentStatus from '../AppointmentStatus/AppointmentStatus';
import { btn, card, supportText } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const AppointmentCard = ({ appointment, onCancel, onReview }) => {
  const isUpcoming = appointment.status === 'confirmed' || appointment.status === 'pending';
  const isPast = appointment.status === 'completed';
  const isCancelled = appointment.status === 'cancelled';

  return (
    <article className={cn(card, 'p-6 flex flex-col gap-4')}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-[1.05rem] text-[var(--text-primary)]">{appointment.doctorName}</h3>
          <p className="text-[var(--text-accent)] text-[var(--text-sm)] font-semibold mt-0.5">
            {appointment.specialty}
          </p>
        </div>
        <AppointmentStatus status={appointment.status} />
      </div>

      <div className="grid gap-2 text-[var(--text-secondary)] text-[var(--text-sm)]">
        <p className="flex justify-between gap-4">
          <span>Date</span> <strong className="text-[var(--text-primary)]">{appointment.dateLabel || appointment.date}</strong>
        </p>
        <p className="flex justify-between gap-4">
          <span>Time</span> <strong className="text-[var(--text-primary)]">{appointment.time}</strong>
        </p>
        <p className="flex justify-between gap-4">
          <span>Location</span> <strong className="text-[var(--text-primary)]">{appointment.location}</strong>
        </p>
        <p className="flex justify-between gap-4">
          <span>Fee</span> <strong className="text-[var(--text-primary)]">{appointment.fee} {appointment.currency || 'EGP'}</strong>
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto [&>a]:flex-1 [&>a]:min-w-[120px] [&>button]:flex-1 [&>button]:min-w-[120px]">
        <Link to={`/patient/appointments/${appointment.id}`} className={btn('ghost', 'sm')}>
          View Details
        </Link>
        {isUpcoming && onCancel && (
          <button type="button" className={btn('outline', 'sm')} onClick={() => onCancel(appointment)}>
            Cancel Appointment
          </button>
        )}
        {isPast && onReview && (
          <button type="button" className={btn('outline', 'sm')} onClick={() => onReview(appointment)}>
            Leave Review
          </button>
        )}
        {isCancelled && (
          <span className={supportText}>This appointment was cancelled.</span>
        )}
      </div>
    </article>
  );
};

export default AppointmentCard;
