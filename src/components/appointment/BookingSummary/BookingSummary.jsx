import React from 'react';
import { Pencil } from 'lucide-react';
import { formatAppointmentDate } from '../../../utils/appointmentUtils';
import { btnGhost, btnLg, btnPrimary, panel } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const summaryRow =
  'flex justify-between gap-4 pb-2.5 border-b border-[var(--gray-100)] [&_.label]:text-[var(--text-muted)] [&_.label]:text-[var(--text-sm)] [&_.value]:font-bold [&_.value]:text-[var(--text-primary)] [&_.value]:text-right';

const BookingSummary = ({
  booking,
  patientInfo,
  showReview = false,
  error,
  loading = false,
  onEditAppointment,
  onConfirm,
  onBack,
  confirmLabel = 'Confirm Appointment',
}) => {
  const displayDate = booking.dateLabel || formatAppointmentDate(booking.date);

  return (
    <aside
      className={cn(
        panel,
        'sticky top-[calc(var(--navbar-height)+16px)] max-[900px]:static',
      )}
      aria-labelledby="booking-summary-heading"
    >
      <h2 id="booking-summary-heading" className="mb-6 text-[1.15rem]">
        {showReview ? 'Review your appointment' : 'Appointment Summary'}
      </h2>

      {onEditAppointment && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 bg-transparent border-none text-[var(--text-accent)] font-semibold text-[var(--text-sm)] cursor-pointer p-0 mb-4 hover:underline"
          onClick={onEditAppointment}
        >
          <Pencil size={14} aria-hidden="true" />
          Edit Appointment
        </button>
      )}

      <div className="grid gap-3 mb-6">
        <div className={summaryRow}>
          <span className="label">Doctor</span>
          <span className="value">{booking.doctorName}</span>
        </div>
        <div className={summaryRow}>
          <span className="label">Specialty</span>
          <span className="value">{booking.specialty}</span>
        </div>
        <div className={summaryRow}>
          <span className="label">Date</span>
          <span className="value">{displayDate}</span>
        </div>
        <div className={summaryRow}>
          <span className="label">Time</span>
          <span className="value">{booking.time}</span>
        </div>
        <div className={summaryRow}>
          <span className="label">Location</span>
          <span className="value">{booking.location}</span>
        </div>
        <div className={summaryRow}>
          <span className="label">Consultation Fee</span>
          <span className="value">{booking.fee} {booking.currency || 'EGP'}</span>
        </div>
      </div>

      {patientInfo && (
        <>
          <p className="text-[var(--text-sm)] font-bold text-[var(--text-accent)] uppercase tracking-[0.05em] my-4 mb-2">
            Patient
          </p>
          <div className="grid gap-3 mb-6">
            <div className={summaryRow}>
              <span className="label">Name</span>
              <span className="value">{patientInfo.fullName}</span>
            </div>
            <div className={summaryRow}>
              <span className="label">Email</span>
              <span className="value">{patientInfo.email}</span>
            </div>
            <div className={summaryRow}>
              <span className="label">Phone</span>
              <span className="value">{patientInfo.phone}</span>
            </div>
            <div className={summaryRow}>
              <span className="label">Reason</span>
              <span className="value">{patientInfo.reason}</span>
            </div>
          </div>
        </>
      )}

      {error && (
        <p
          className="bg-[var(--bg-danger-subtle)] border border-[var(--border-subtle)] text-[var(--text-danger)] rounded-md p-3 text-[var(--text-sm)] mb-4"
          role="alert"
        >
          {error}
        </p>
      )}

      {showReview && (
        <div className="grid gap-2.5 [&_button]:w-full">
          <button
            type="button"
            className={cn(btnPrimary, btnLg)}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Confirming...' : confirmLabel}
          </button>
          {onBack && (
            <button type="button" className={btnGhost} onClick={onBack} disabled={loading}>
              Go Back
            </button>
          )}
        </div>
      )}
    </aside>
  );
};

export default BookingSummary;
