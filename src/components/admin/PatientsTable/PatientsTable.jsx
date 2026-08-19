import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import { formatAppointmentDate } from '../../../utils/appointmentUtils';
import { adminTable, adminTableActions, adminTableWrap, btn, supportText } from '../../../constants/uiClasses';

const PatientsTable = ({ patients, onSuspend, onActivate }) => {
  if (!patients.length) {
    return <p className={supportText}>No patients found.</p>;
  }

  return (
    <div className={adminTableWrap}>
      <table className={adminTable} aria-label="Patients">
        <thead>
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Total Appointments</th>
            <th scope="col">Last Appointment</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => {
            const isActive = patient.status === 'active';

            return (
            <tr key={patient.patientId}>
              <td>{patient.name}</td>
              <td>{patient.email}</td>
              <td>{patient.phone}</td>
              <td>{patient.totalAppointments}</td>
              <td>
                {patient.lastAppointment
                  ? `${formatAppointmentDate(patient.lastAppointment.date)} · ${patient.lastAppointment.time}`
                  : '—'}
              </td>
              <td><StatusBadge status={patient.status} /></td>
              <td>
                <div className={adminTableActions}>
                  {isActive ? (
                    <button
                      type="button"
                      className={btn('outline', 'sm')}
                      onClick={() => onSuspend?.(patient)}
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={btn('primary', 'sm')}
                      onClick={() => onActivate?.(patient)}
                    >
                      Activate
                    </button>
                  )}
                </div>
              </td>
            </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
