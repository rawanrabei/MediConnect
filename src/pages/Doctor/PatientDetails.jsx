import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppointmentStatus from '../../components/appointment/AppointmentStatus/AppointmentStatus';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { selectDoctorAppointments } from '../../features/appointments/appointmentSelectors';
import { formatAppointmentDate } from '../../utils/appointmentUtils';
import { categorizeAppointments } from '../../utils/appointmentUtils';
import { btn, doctorDashboard, panel, panelHeader, supportText } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const detailsGrid = 'grid grid-cols-2 gap-6 max-md:grid-cols-1';
const detailsPanel = cn(panel, '[&_h2]:text-[1.05rem] [&_h2]:mb-4');
const detailsList = 'grid gap-3';
const detailsRow =
  'flex justify-between gap-4 text-[var(--text-sm)] pb-2.5 border-b border-[var(--gray-100)] [&_span:first-child]:text-[var(--text-muted)] [&_strong]:text-[var(--text-primary)] [&_strong]:text-right';
const detailsActions = 'flex flex-wrap gap-2.5';
const appointmentCardList = 'grid gap-4';
const doctorAppointmentCard =
  'border border-[var(--border-subtle)] rounded-md p-4 grid gap-2 bg-[var(--bg-muted)] text-[var(--text-primary)]';
const doctorAppointmentCardHeader = 'flex justify-between items-start gap-2';
const doctorAppointmentCardMeta = 'grid gap-1 text-[var(--text-sm)] text-[var(--text-secondary)]';

const DoctorPatientDetails = () => {
  const { patientId } = useParams();
  const { doctorId } = useDoctorContext();
  const appointments = useSelector(selectDoctorAppointments(doctorId));

  const patientData = useMemo(() => {
    const patientAppointments = appointments.filter(
      (appointment) => String(appointment.patientId) === String(patientId)
    );

    if (!patientAppointments.length) return null;

    const sample = patientAppointments[0].patientInfo || {};
    const { upcoming, past } = categorizeAppointments(patientAppointments);

    return {
      name: sample.fullName || 'Patient',
      email: sample.email || '—',
      phone: sample.phone || '—',
      dateOfBirth: sample.dateOfBirth || '—',
      gender: sample.gender || '—',
      totalAppointments: patientAppointments.length,
      lastAppointment: past[0] || patientAppointments[patientAppointments.length - 1],
      upcomingAppointment: upcoming[0] || null,
      history: [...upcoming, ...past],
    };
  }, [appointments, patientId]);

  if (!patientData) {
    return (
      <div className={doctorDashboard}>
        <div className={cn(panel, 'text-center')}>
          <h1>Patient not found</h1>
          <p className={`${supportText} my-3 mb-6`}>
            This patient has no appointments with your practice.
          </p>
          <Link to="/doctor/patients" className={btn('primary')}>
            Back to Patients
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={doctorDashboard}>
      <div className={detailsGrid}>
        <section className={detailsPanel}>
          <h2>Patient Information</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Name</span><strong>{patientData.name}</strong></div>
            <div className={detailsRow}><span>Email</span><strong>{patientData.email}</strong></div>
            <div className={detailsRow}><span>Phone</span><strong>{patientData.phone}</strong></div>
            <div className={detailsRow}><span>Date of Birth</span><strong>{patientData.dateOfBirth}</strong></div>
            <div className={detailsRow}><span>Gender</span><strong>{patientData.gender}</strong></div>
          </dl>
        </section>

        <section className={detailsPanel}>
          <h2>Summary</h2>
          <dl className={detailsList}>
            <div className={detailsRow}><span>Total Appointments</span><strong>{patientData.totalAppointments}</strong></div>
            <div className={detailsRow}>
              <span>Last Appointment</span>
              <strong>
                {patientData.lastAppointment
                  ? `${formatAppointmentDate(patientData.lastAppointment.date)} · ${patientData.lastAppointment.time}`
                  : '—'}
              </strong>
            </div>
            <div className={detailsRow}>
              <span>Upcoming Appointment</span>
              <strong>
                {patientData.upcomingAppointment
                  ? `${formatAppointmentDate(patientData.upcomingAppointment.date)} · ${patientData.upcomingAppointment.time}`
                  : 'None scheduled'}
              </strong>
            </div>
          </dl>
        </section>
      </div>

      <section className={panel}>
        <div className={panelHeader}>
          <h3>Appointment History</h3>
        </div>
        <div className={appointmentCardList}>
          {patientData.history.map((appointment) => (
            <article key={appointment.id} className={doctorAppointmentCard}>
              <div className={doctorAppointmentCardHeader}>
                <strong>{formatAppointmentDate(appointment.date)} · {appointment.time}</strong>
                <AppointmentStatus status={appointment.status} />
              </div>
              <div className={doctorAppointmentCardMeta}>
                <span>Reason: {appointment.patientInfo?.reason || '—'}</span>
                <span>Location: {appointment.location || '—'}</span>
              </div>
              <Link to={`/doctor/appointments/${appointment.id}`} className={btn('ghost', 'sm')}>
                View Appointment
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className={detailsActions}>
        <Link to="/doctor/patients" className={btn('ghost')}>
          Back to Patients
        </Link>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;
