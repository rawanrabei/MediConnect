import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentStatus from '../../appointment/AppointmentStatus/AppointmentStatus';
import { formatAppointmentDate } from '../../../utils/appointmentUtils';
import { adminTable, adminTableActions, adminTableWrap, btn } from '../../../constants/uiClasses';

const AdminAppointmentsTable = ({ appointments, onCancel }) => (
  <div className={adminTableWrap}>
    <table className={adminTable} aria-label="All appointments">
      <thead>
        <tr>
          <th scope="col">Appointment ID</th>
          <th scope="col">Patient</th>
          <th scope="col">Doctor</th>
          <th scope="col">Specialty</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Status</th>
          <th scope="col">Fee</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => {
          const canCancel =
            appointment.status !== 'cancelled' && appointment.status !== 'completed';

          return (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patientInfo?.fullName || 'Patient'}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.specialty}</td>
              <td>{formatAppointmentDate(appointment.date)}</td>
              <td>{appointment.time}</td>
              <td><AppointmentStatus status={appointment.status} /></td>
              <td>{appointment.fee} {appointment.currency || 'EGP'}</td>
              <td>
                <div className={adminTableActions}>
                  <Link to={`/admin/appointments/${appointment.id}`} className={btn('ghost', 'sm')}>
                    View
                  </Link>
                  {canCancel && onCancel && (
                    <button
                      type="button"
                      className={btn('outline', 'sm')}
                      onClick={() => onCancel(appointment)}
                    >
                      Cancel
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

export default AdminAppointmentsTable;
