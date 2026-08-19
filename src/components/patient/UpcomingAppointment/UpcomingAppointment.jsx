import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../common/EmptyState/EmptyState';
import AppointmentStatus from '../../appointment/AppointmentStatus/AppointmentStatus';
import { CalendarClock } from 'lucide-react';
import { btn, panel, panelHeader } from '../../../constants/uiClasses';

const upcomingRow =
  'flex justify-between gap-4 text-[var(--text-sm)] pb-2 border-b border-[var(--gray-100)] [&_span:first-child]:text-[var(--text-muted)] [&_strong]:text-[var(--text-primary)] [&_strong]:text-right';

const UpcomingAppointment = ({ appointment, onCancel }) => {
  if (!appointment) {
    return (
      <section className={panel}>
        <div className={panelHeader}>
          <h3>Upcoming Appointment</h3>
        </div>
        <EmptyState
          icon={<CalendarClock size={32} />}
          title="No upcoming appointments"
          description="Book an appointment with a trusted doctor."
          action={<Link to="/doctors" className={btn('primary')}>Find a Doctor</Link>}
        />
      </section>
    );
  }

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Upcoming Appointment</h3>
        <AppointmentStatus status={appointment.status} />
      </div>
      <div className="grid gap-2.5">
        <div className={upcomingRow}><span>Doctor</span><strong>{appointment.doctorName}</strong></div>
        <div className={upcomingRow}><span>Specialty</span><strong>{appointment.specialty}</strong></div>
        <div className={upcomingRow}><span>Date</span><strong>{appointment.dateLabel || appointment.date}</strong></div>
        <div className={upcomingRow}><span>Time</span><strong>{appointment.time}</strong></div>
        <div className={upcomingRow}><span>Location</span><strong>{appointment.location}</strong></div>
        <div className={upcomingRow}><span>Fee</span><strong>{appointment.fee} {appointment.currency || 'EGP'}</strong></div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <Link to={`/patient/appointments/${appointment.id}`} className={btn('primary', 'sm')}>
          View Details
        </Link>
        {onCancel && (
          <button type="button" className={btn('outline', 'sm')} onClick={() => onCancel(appointment)}>
            Cancel Appointment
          </button>
        )}
      </div>
    </section>
  );
};

export default UpcomingAppointment;
