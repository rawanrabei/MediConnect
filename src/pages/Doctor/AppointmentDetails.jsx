import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentStatus from '../../components/appointment/AppointmentStatus/AppointmentStatus';
import Modal from '../../components/common/Modal/Modal';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { selectDoctorAppointmentById } from '../../features/appointments/appointmentSelectors';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES, formatAppointmentDate } from '../../utils/appointmentUtils';
import { selectDoctorById } from '../../features/doctors/doctorSelectors';
import { btn, panel, supportText } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const appointmentDetailsPage = 'grid gap-6';
const appointmentDetailsHeader =
  'flex justify-between items-start gap-4 flex-wrap [&_h1]:text-[var(--text-2xl)]';
const detailsGrid = 'grid grid-cols-2 gap-6 max-md:grid-cols-1';
const detailsPanel = cn(panel, '[&_h2]:text-[1.05rem] [&_h2]:mb-4');
const detailsList = 'grid gap-3';
const detailsRow =
  'flex justify-between gap-4 text-[var(--text-sm)] pb-2.5 border-b border-[var(--gray-100)] [&_span:first-child]:text-[var(--text-muted)] [&_strong]:text-[var(--text-primary)] [&_strong]:text-right';
const detailsActions = 'flex flex-wrap gap-2.5';

const DoctorAppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { doctorId } = useDoctorContext();
  const appointment = useSelector(selectDoctorAppointmentById(doctorId, id));
  const doctor = useSelector(selectDoctorById(doctorId));
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!appointment) {
    return (
      <div className={appointmentDetailsPage}>
        <div className={cn(panel, 'text-center')}>
          <h1>Appointment not found</h1>
          <p className="my-3 mb-6 text-[var(--text-secondary)]">
            This appointment may not belong to your practice or the link is incorrect.
          </p>
          <Link to="/doctor/appointments" className={btn('primary')}>
            Back to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const patientInfo = appointment.patientInfo || {};
  const canAccept = appointment.status === 'pending';
  const canComplete = appointment.status === 'confirmed' || appointment.status === 'pending';
  const canCancel = appointment.status !== 'cancelled' && appointment.status !== 'completed';

  const handleAccept = () => {
    dispatch(patchAppointmentStatus({
      id: appointment.id,
      status: APPOINTMENT_STATUSES.CONFIRMED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_confirmed',
      title: 'Appointment accepted',
      message: `You accepted the appointment with ${patientInfo.fullName || 'patient'}.`,
      date: new Date().toISOString(),
      read: false,
    }));
  };

  const handleComplete = () => {
    dispatch(patchAppointmentStatus({
      id: appointment.id,
      status: APPOINTMENT_STATUSES.COMPLETED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_completed',
      title: 'Appointment completed',
      message: `Appointment with ${patientInfo.fullName || 'patient'} marked as completed.`,
      date: new Date().toISOString(),
      read: false,
    }));
  };

  const handleCancel = () => {
    dispatch(patchAppointmentStatus({
      id: appointment.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_cancelled',
      title: 'Appointment cancelled',
      message: `Appointment with ${patientInfo.fullName || 'patient'} was cancelled.`,
      date: new Date().toISOString(),
      read: false,
    }));
    setShowCancelModal(false);
  };

  return (
    <div className={appointmentDetailsPage}>
      <div className={appointmentDetailsHeader}>
        <div>
          <p className={supportText}>Appointment ID: {appointment.id}</p>
        </div>
        <AppointmentStatus status={appointment.status} />
      </div>

      <div className={detailsGrid}>
        <section className={detailsPanel}>
          <h2>Patient Information</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Name</span><strong>{patientInfo.fullName}</strong></div>
            <div className={detailsRow}><span>Email</span><strong>{patientInfo.email}</strong></div>
            <div className={detailsRow}><span>Phone</span><strong>{patientInfo.phone}</strong></div>
            <div className={detailsRow}><span>Date of Birth</span><strong>{patientInfo.dateOfBirth || '—'}</strong></div>
            <div className={detailsRow}><span>Gender</span><strong>{patientInfo.gender || '—'}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Appointment Information</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Date</span><strong>{appointment.dateLabel || formatAppointmentDate(appointment.date)}</strong></div>
            <div className={detailsRow}><span>Time</span><strong>{appointment.time}</strong></div>
            <div className={detailsRow}><span>Reason</span><strong>{patientInfo.reason || '—'}</strong></div>
            <div className={detailsRow}><span>Notes</span><strong>{patientInfo.notes || '—'}</strong></div>
            <div className={detailsRow}><span>Status</span><strong>{appointment.status}</strong></div>
            <div className={detailsRow}><span>Fee</span><strong>{appointment.fee} {appointment.currency || 'EGP'}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Clinic Information</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Clinic</span><strong>{doctor?.clinic?.name || '—'}</strong></div>
            <div className={detailsRow}><span>Location</span><strong>{appointment.location || doctor?.clinic?.address || '—'}</strong></div>
          </dl>
        </section>
      </div>

      <div className={detailsActions}>
        <Link to="/doctor/appointments" className={btn('ghost')}>
          Back to Appointments
        </Link>
        {canAccept && (
          <button type="button" className={btn('primary')} onClick={handleAccept}>
            Accept
          </button>
        )}
        {canComplete && (
          <button type="button" className={btn('primary')} onClick={handleComplete}>
            Complete
          </button>
        )}
        {canCancel && (
          <button type="button" className={btn('outline')} onClick={() => setShowCancelModal(true)}>
            Cancel Appointment
          </button>
        )}
      </div>

      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Appointment"
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className={btn('primary')} onClick={handleCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btn('ghost')} onClick={() => setShowCancelModal(false)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorAppointmentDetails;
