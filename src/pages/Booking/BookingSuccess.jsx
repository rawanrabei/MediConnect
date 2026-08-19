import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSelectedAppointment } from '../../features/appointments/appointmentSelectors';
import { btnGhost, btnPrimary, container, pagePadding } from '../../constants/uiClasses';

const detailRow =
  'flex justify-between gap-4 text-[var(--text-sm)] [&_span:first-child]:text-[var(--text-muted)] [&_strong]:text-[var(--text-primary)] [&_strong]:text-right';

const BookingSuccess = () => {
  const appointment = useSelector(selectSelectedAppointment);

  const successCard =
    'max-w-[560px] mx-auto bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl py-16 px-8 text-center [&_h1]:mb-2 [&>p]:text-[var(--text-secondary)] [&>p]:mb-8';

  const renderActions = () => (
    <div className="flex flex-wrap gap-2.5 justify-center [&_a]:min-w-[180px] max-sm:[&_a]:w-full">
      <Link to="/patient/appointments" className={btnPrimary}>
        View My Appointments
      </Link>
      <Link to="/" className={btnGhost}>
        Back to Home
      </Link>
    </div>
  );

  if (!appointment) {
    return (
      <div className={pagePadding}>
        <div className={container}>
          <div className={successCard}>
            <div
              className="w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-[var(--secondary-100)] text-[var(--text-success)] grid place-items-center text-[2rem] font-extrabold"
              aria-hidden="true"
            >
              ✓
            </div>
            <h1>Appointment Confirmed</h1>
            <p>Your appointment has been successfully booked.</p>
            {renderActions()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pagePadding}>
      <div className={container}>
        <div className={successCard}>
          <div
            className="w-[72px] h-[72px] mx-auto mb-6 rounded-full bg-[var(--secondary-100)] text-[var(--text-success)] grid place-items-center text-[2rem] font-extrabold"
            aria-hidden="true"
          >
            ✓
          </div>
          <h1>Appointment Confirmed</h1>
          <p>Your appointment has been successfully booked.</p>

          <div className="text-left grid gap-2.5 mb-8 p-6 bg-[var(--gray-50)] rounded-md">
            <div className={detailRow}>
              <span>Doctor</span>
              <strong>{appointment.doctorName}</strong>
            </div>
            <div className={detailRow}>
              <span>Specialty</span>
              <strong>{appointment.specialty}</strong>
            </div>
            <div className={detailRow}>
              <span>Date</span>
              <strong>{appointment.dateLabel || appointment.date}</strong>
            </div>
            <div className={detailRow}>
              <span>Time</span>
              <strong>{appointment.time}</strong>
            </div>
            <div className={detailRow}>
              <span>Location</span>
              <strong>{appointment.location}</strong>
            </div>
            <div className={detailRow}>
              <span>Patient</span>
              <strong>{appointment.patientInfo?.fullName}</strong>
            </div>
            <div className={detailRow}>
              <span>Appointment ID</span>
              <strong>{appointment.id}</strong>
            </div>
          </div>

          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
