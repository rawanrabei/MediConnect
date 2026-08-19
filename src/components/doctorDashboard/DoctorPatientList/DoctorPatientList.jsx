import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import EmptyState from '../../common/EmptyState/EmptyState';
import { formatAppointmentDate } from '../../../utils/appointmentUtils';
import { btn, panel, panelHeader, supportText } from '../../../constants/uiClasses';

const doctorPatientList = 'grid gap-4';
const doctorPatientRow =
  'grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr_1fr] gap-4 items-center py-3.5 border-b border-[var(--border-subtle)] text-[var(--text-sm)] max-lg:grid-cols-1 max-lg:p-4 max-lg:border max-lg:border-[var(--border-subtle)] max-lg:rounded-md last:border-b-0 max-lg:last:border-b [&_a]:text-[var(--text-accent)] [&_a]:font-semibold [&_a]:no-underline hover:[&_a]:underline';

const DoctorPatientList = ({ patients, title = 'Recent Patients', compact = false }) => {
  if (!patients.length) {
    return (
      <section className={panel}>
        <div className={panelHeader}>
          <h3>{title}</h3>
        </div>
        <EmptyState
          icon={<Users size={32} />}
          title="No patients yet"
          description="Patients who book appointments with you will appear here."
        />
      </section>
    );
  }

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>{title}</h3>
        {!compact && (
          <Link to="/doctor/patients" className={btn('ghost', 'sm')}>
            View All
          </Link>
        )}
      </div>
      <div className={doctorPatientList} role="list">
        {patients.map((patient) => (
          <article key={patient.patientId} className={doctorPatientRow} role="listitem">
            <div>
              <strong>{patient.name}</strong>
              <p className={supportText}>{patient.email}</p>
            </div>
            <div>
              <span className={supportText}>Last visit</span>
              <p>
                {patient.lastAppointment
                  ? formatAppointmentDate(patient.lastAppointment.date)
                  : '—'}
              </p>
            </div>
            <div>
              <span className={supportText}>Total</span>
              <p>{patient.totalAppointments}</p>
            </div>
            <div>
              <span className={supportText}>Status</span>
              <p style={{ textTransform: 'capitalize' }}>{patient.status}</p>
            </div>
            <div>
              <Link to={`/doctor/patients/${patient.patientId}`}>View Details</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DoctorPatientList;
