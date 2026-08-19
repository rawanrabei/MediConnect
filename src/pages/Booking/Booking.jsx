import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BookingForm from '../../components/appointment/BookingForm/BookingForm';
import BookingSummary from '../../components/appointment/BookingSummary/BookingSummary';
import { useAuth } from '../../hooks/useAuth';
import { createAppointment } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import {
  clearAppointmentError,
  setAppointmentError,
} from '../../features/appointments/appointmentSlice';
import {
  selectAppointments,
  selectAppointmentsError,
  selectAppointmentsLoading,
} from '../../features/appointments/appointmentSelectors';
import { selectDoctorById } from '../../features/doctors/doctorSelectors';
import {
  APPOINTMENT_STATUSES,
  createAppointmentId,
  formatAppointmentDate,
} from '../../utils/appointmentUtils';
import {
  bodyText,
  btnGhost,
  btnPrimary,
  container,
  pagePadding,
  panel,
  sectionTitle,
  supportText,
} from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const Booking = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const loading = useSelector(selectAppointmentsLoading);
  const error = useSelector(selectAppointmentsError);
  const appointments = useSelector(selectAppointments);
  const slot = location.state || {};

  const [step, setStep] = useState('form');
  const [patientInfo, setPatientInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: '',
    gender: '',
    reason: '',
    notes: '',
  });

  const doctor = useSelector(selectDoctorById(doctorId));

  const noticeCard =
    'bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg py-16 px-8 text-center [&_h1]:mb-2 [&_p]:text-[var(--text-secondary)] [&_p]:mb-6';

  if (!doctor) {
    return (
      <div className={pagePadding}>
        <div className={container}>
          <div className={noticeCard}>
            <h1>Doctor not found</h1>
            <p>The doctor for this booking could not be found.</p>
            <Link to="/doctors" className={btnPrimary}>Back to Doctors</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!slot.date || !slot.time) {
    return (
      <div className={pagePadding}>
        <div className={container}>
          <div className={noticeCard}>
            <h1>No appointment slot selected</h1>
            <p>Please choose a date and time before continuing with your booking.</p>
            <Link to={`/doctors/${doctor.id}`} className={btnPrimary}>
              Back to Doctor Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const booking = {
    doctorId: doctor.id,
    doctorName: doctor.name,
    specialty: doctor.specialty,
    date: slot.date,
    dateLabel: slot.label || formatAppointmentDate(slot.date),
    time: slot.time,
    location: doctor.clinic?.address
      ? `${doctor.clinic.name}, ${doctor.clinic.city}`
      : doctor.location,
    fee: doctor.consultationFee,
    currency: doctor.currency || 'EGP',
  };

  const redirectToLogin = () => {
    navigate('/login', {
      state: {
        from: location.pathname,
        bookingState: slot,
      },
    });
  };

  const handleFormSubmit = (data) => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }

    dispatch(clearAppointmentError());
    setPatientInfo(data);
    setStep('review');
  };

  const handleConfirm = async () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }

    const patientId = user?.id;
    const duplicate = appointments.some(
      (appointment) =>
        String(appointment.patientId) === String(patientId) &&
        String(appointment.doctorId) === String(doctor.id) &&
        appointment.date === slot.date &&
        appointment.time === slot.time &&
        appointment.status !== APPOINTMENT_STATUSES.CANCELLED
    );

    if (duplicate) {
      dispatch(setAppointmentError('This appointment slot has already been booked.'));
      return;
    }

    dispatch(clearAppointmentError());

    const appointment = {
      id: createAppointmentId(),
      doctorId: doctor.id,
      patientId,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: slot.date,
      dateLabel: booking.dateLabel,
      time: slot.time,
      location: booking.location,
      fee: doctor.consultationFee,
      currency: doctor.currency || 'EGP',
      status: APPOINTMENT_STATUSES.CONFIRMED,
      patientInfo,
      createdAt: new Date().toISOString(),
    };

    const result = await dispatch(createAppointment(appointment));
    if (createAppointment.rejected.match(result)) {
      return;
    }

    await Promise.all([
      dispatch(createNotification({
        role: 'patient',
        type: 'appointment_confirmed',
        title: 'Appointment confirmed',
        message: `Your appointment with ${doctor.name} on ${booking.dateLabel} at ${slot.time} is confirmed.`,
        date: new Date().toISOString(),
        read: false,
      })),
      dispatch(createNotification({
        role: 'doctor',
        type: 'new_appointment',
        title: 'New appointment booked',
        message: `${patientInfo.fullName} booked an appointment on ${booking.dateLabel} at ${slot.time}.`,
        date: new Date().toISOString(),
        read: false,
      })),
    ]);

    navigate('/booking/success', { state: { appointmentId: result.payload.id } });
  };

  return (
    <div className={cn(pagePadding, 'max-[900px]:py-8')}>
      <div className={container}>
        <header className="mb-8">
          <h1 className={sectionTitle}>Complete Your Booking</h1>
          <p className={cn(supportText, 'mt-2')}>Fill in your details and review your appointment before confirming.</p>
        </header>

        <div className="flex gap-3 mb-8 flex-wrap" aria-label="Booking progress">
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[var(--text-sm)] font-semibold',
              step === 'form' ? 'bg-[var(--primary-100)] text-[var(--text-accent)]' : 'bg-[var(--secondary-100)] text-[var(--text-success)]',
            )}
          >
            1. Patient Information
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[var(--text-sm)] font-semibold',
              step === 'review' ? 'bg-[var(--primary-100)] text-[var(--text-accent)]' : 'bg-[var(--gray-100)] text-[var(--text-secondary)]',
            )}
          >
            2. Review & Confirm
          </span>
        </div>

        <div className="grid grid-cols-[1.2fr_0.8fr] gap-8 items-start max-[900px]:grid-cols-1">
          <div>
            {step === 'form' ? (
              <BookingForm
                defaultValues={patientInfo}
                onSubmit={handleFormSubmit}
                submitLabel="Continue to Review"
              />
            ) : (
              <section className={panel}>
                <h2 className="text-[1.15rem] mb-6">Review your appointment</h2>
                <p className={cn(bodyText, 'mb-6')}>
                  Please verify your appointment details and patient information before confirming.
                </p>
                <button
                  type="button"
                  className={btnGhost}
                  onClick={() => setStep('form')}
                >
                  Go Back
                </button>
              </section>
            )}
          </div>

          <BookingSummary
            booking={booking}
            patientInfo={step === 'review' ? patientInfo : null}
            showReview={step === 'review'}
            error={error}
            loading={loading}
            onEditAppointment={() => navigate(`/doctors/${doctor.id}`, { state: { selectedSlot: slot } })}
            onConfirm={handleConfirm}
            onBack={() => setStep('form')}
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
