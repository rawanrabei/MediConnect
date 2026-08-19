import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarClock } from 'lucide-react';
import AppointmentCard from '../../components/appointment/AppointmentCard/AppointmentCard';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import { useAuth } from '../../hooks/useAuth';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { selectPatientAppointments } from '../../features/appointments/appointmentSelectors';
import { categorizeAppointments } from '../../utils/appointmentUtils';
import { btnGhost, btnPrimary, supportText } from '../../constants/uiClasses';

const PatientAppointments = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const appointments = useSelector(selectPatientAppointments(user?.id));
  const { upcoming, past, cancelled } = categorizeAppointments(appointments);
  const [cancelTarget, setCancelTarget] = useState(null);

  const handleConfirmCancel = () => {
    if (cancelTarget) {
      dispatch(patchAppointmentStatus({
        id: cancelTarget.id,
        status: APPOINTMENT_STATUSES.CANCELLED,
      }));
      dispatch(createNotification({
        role: 'patient',
        type: 'appointment_cancelled',
        title: 'Appointment cancelled',
        message: `Your appointment with ${cancelTarget.doctorName} was cancelled.`,
        date: new Date().toISOString(),
        read: false,
      }));
      setCancelTarget(null);
    }
  };

  const renderSection = (title, items, emptyTitle, emptyDescription, emptyAction, showCancel, showReview) => (
    <section aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <h2 id={title.replace(/\s+/g, '-').toLowerCase()} className="text-[1.1rem] mb-4 text-[var(--text-primary)]">
        {title}
      </h2>
      {items.length === 0 ? (
        <EmptyState
          icon={<CalendarClock size={32} />}
          title={emptyTitle}
          description={emptyDescription}
          action={emptyAction}
        />
      ) : (
        <div className="grid grid-cols-2 gap-6 max-[900px]:grid-cols-1">
          {items.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onCancel={showCancel ? setCancelTarget : undefined}
              onReview={showReview ? () => {} : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="grid gap-8">
      <header>
        <p className={supportText}>Manage your upcoming visits and review your appointment history.</p>
      </header>

      {renderSection(
        'Upcoming',
        upcoming,
        'No upcoming appointments',
        'Book an appointment with a trusted doctor.',
        <Link to="/doctors" className={btnPrimary}>Find a Doctor</Link>,
        true,
        false
      )}

      {renderSection(
        'Past',
        past,
        'No past appointments',
        'Completed appointments will appear here.',
        null,
        false,
        true
      )}

      {renderSection(
        'Cancelled',
        cancelled,
        'No cancelled appointments',
        'Cancelled appointments will appear here.',
        null,
        false,
        false
      )}

      <Modal
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Appointment"
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex gap-2.5 flex-wrap">
          <button type="button" className={btnPrimary} onClick={handleConfirmCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btnGhost} onClick={() => setCancelTarget(null)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PatientAppointments;
