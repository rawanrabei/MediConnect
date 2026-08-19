import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentStatus from '../../components/appointment/AppointmentStatus/AppointmentStatus';
import Modal from '../../components/common/Modal/Modal';
import { selectAppointmentById } from '../../features/appointments/appointmentSelectors';
import { selectDoctorById } from '../../features/doctors/doctorSelectors';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { APPOINTMENT_STATUSES, formatAppointmentDate } from '../../utils/appointmentUtils';
import { formatCreatedDate } from '../../utils/adminUtils';
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

const AdminAppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const appointment = useSelector(selectAppointmentById(id));
  const [showCancelModal, setShowCancelModal] = useState(false);
  const doctor = useSelector(selectDoctorById(appointment?.doctorId));

  if (!appointment) {
    return (
      <div className={appointmentDetailsPage}>
        <div className={cn(panel, 'text-center')}>
          <h1>Appointment not found</h1>
          <p className="my-3 mb-6 text-[var(--text-secondary)]">
            This appointment may have been removed or the link is incorrect.
          </p>
          <Link to="/admin/appointments" className={btn('primary')}>
            Back to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const patientInfo = appointment.patientInfo || {};
  const canCancel = appointment.status !== 'cancelled' && appointment.status !== 'completed';

  const handleCancel = () => {
    dispatch(patchAppointmentStatus({
      id: appointment.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
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
          <h2>Appointment</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>ID</span><strong>{appointment.id}</strong></div>
            <div className={detailsRow}><span>Date</span><strong>{appointment.dateLabel || formatAppointmentDate(appointment.date)}</strong></div>
            <div className={detailsRow}><span>Time</span><strong>{appointment.time}</strong></div>
            <div className={detailsRow}><span>Status</span><strong>{appointment.status}</strong></div>
            <div className={detailsRow}><span>Fee</span><strong>{appointment.fee} {appointment.currency || 'EGP'}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Patient</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Name</span><strong>{patientInfo.fullName}</strong></div>
            <div className={detailsRow}><span>Email</span><strong>{patientInfo.email}</strong></div>
            <div className={detailsRow}><span>Phone</span><strong>{patientInfo.phone}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Doctor</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Name</span><strong>{appointment.doctorName}</strong></div>
            <div className={detailsRow}><span>Specialty</span><strong>{appointment.specialty}</strong></div>
            <div className={detailsRow}><span>Location</span><strong>{appointment.location || doctor?.location || '—'}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Metadata</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Created</span><strong>{formatCreatedDate(appointment.createdAt)}</strong></div>
            <div className={detailsRow}><span>Reason</span><strong>{patientInfo.reason || '—'}</strong></div>
            <div className={detailsRow}><span>Notes</span><strong>{patientInfo.notes || '—'}</strong></div>
          </dl>
        </section>
      </div>

      <div className={detailsActions}>
        <Link to="/admin/appointments" className={btn('ghost')}>
          Back to Appointments
        </Link>
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

export default AdminAppointmentDetails;
