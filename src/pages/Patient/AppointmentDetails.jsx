import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentStatus from '../../components/appointment/AppointmentStatus/AppointmentStatus';
import Modal from '../../components/common/Modal/Modal';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { selectAppointmentById } from '../../features/appointments/appointmentSelectors';
import { btnGhost, btnOutline, btnPrimary, panel, supportText } from '../../constants/uiClasses';

const detailsRow =
  'flex justify-between gap-4 text-[var(--text-sm)] pb-2.5 border-b border-[var(--gray-100)] [&_span:first-child]:text-[var(--text-muted)] [&_strong]:text-[var(--text-primary)] [&_strong]:text-right';

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const appointment = useSelector(selectAppointmentById(id));
  const [showCancelModal, setShowCancelModal] = useState(false);

  if (!appointment) {
    return (
      <div className="grid gap-6">
        <div className={panel} style={{ textAlign: 'center' }}>
          <h1>Appointment not found</h1>
          <p className="my-3 mb-6 text-[var(--text-secondary)]">
            This appointment may have been removed or the link is incorrect.
          </p>
          <Link to="/patient/appointments" className={btnPrimary}>
            Back to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const canCancel = appointment.status === 'confirmed' || appointment.status === 'pending';
  const patientInfo = appointment.patientInfo || {};

  const handleCancel = () => {
    dispatch(patchAppointmentStatus({
      id: appointment.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    dispatch(createNotification({
      role: 'patient',
      type: 'appointment_cancelled',
      title: 'Appointment cancelled',
      message: `Your appointment with ${appointment.doctorName} was cancelled.`,
      date: new Date().toISOString(),
      read: false,
    }));
    setShowCancelModal(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <div>
          <p className={supportText}>Appointment ID: {appointment.id}</p>
        </div>
        <AppointmentStatus status={appointment.status} />
      </div>

      <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1">
        <section className={panel}>
          <h2 className="text-[1.05rem] mb-4">Appointment Information</h2>
          <dl className="grid gap-3">
            <div className={detailsRow}><span>Doctor</span><strong>{appointment.doctorName}</strong></div>
            <div className={detailsRow}><span>Specialty</span><strong>{appointment.specialty}</strong></div>
            <div className={detailsRow}><span>Date</span><strong>{appointment.dateLabel || appointment.date}</strong></div>
            <div className={detailsRow}><span>Time</span><strong>{appointment.time}</strong></div>
            <div className={detailsRow}><span>Status</span><strong>{appointment.status}</strong></div>
            <div className={detailsRow}><span>Fee</span><strong>{appointment.fee} {appointment.currency || 'EGP'}</strong></div>
          </dl>
        </section>

        <section className={panel}>
          <h2 className="text-[1.05rem] mb-4">Clinic Information</h2>
          <dl className="grid gap-3">
            <div className={detailsRow}><span>Location</span><strong>{appointment.location}</strong></div>
          </dl>
        </section>

        <section className={panel}>
          <h2 className="text-[1.05rem] mb-4">Patient Information</h2>
          <dl className="grid gap-3">
            <div className={detailsRow}><span>Name</span><strong>{patientInfo.fullName}</strong></div>
            <div className={detailsRow}><span>Email</span><strong>{patientInfo.email}</strong></div>
            <div className={detailsRow}><span>Phone</span><strong>{patientInfo.phone}</strong></div>
            <div className={detailsRow}><span>Date of Birth</span><strong>{patientInfo.dateOfBirth || '—'}</strong></div>
            <div className={detailsRow}><span>Gender</span><strong>{patientInfo.gender || '—'}</strong></div>
            <div className={detailsRow}><span>Reason</span><strong>{patientInfo.reason || '—'}</strong></div>
            {patientInfo.notes ? (
              <div className={detailsRow}><span>Notes</span><strong>{patientInfo.notes}</strong></div>
            ) : null}
          </dl>
        </section>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Link to="/patient/appointments" className={btnGhost}>
          Back to Appointments
        </Link>
        {canCancel && (
          <button type="button" className={btnOutline} onClick={() => setShowCancelModal(true)}>
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
        <div className="flex gap-2.5 flex-wrap">
          <button type="button" className={btnPrimary} onClick={handleCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btnGhost} onClick={() => setShowCancelModal(false)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentDetails;
