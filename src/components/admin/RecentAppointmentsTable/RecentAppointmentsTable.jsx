import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';
import AppointmentStatus from '../../appointment/AppointmentStatus/AppointmentStatus';
import EmptyState from '../../common/EmptyState/EmptyState';
import { formatAppointmentDate } from '../../../utils/appointmentUtils';
import { adminTable, adminTableWrap, btn, panel, panelHeader } from '../../../constants/uiClasses';

const RecentAppointmentsTable = ({ appointments }) => {
  if (!appointments.length) {
    return (
      <section className={panel}>
        <div className={panelHeader}>
          <h3>Recent Appointments</h3>
        </div>
        <EmptyState
          icon={<CalendarClock size={32} />}
          title="No appointments"
          description="Recent platform appointments will appear here."
        />
      </section>
    );
  }

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Recent Appointments</h3>
        <Link to="/admin/appointments" className={btn('ghost', 'sm')}>View All</Link>
      </div>
      <div className={adminTableWrap}>
        <table className={adminTable} aria-label="Recent appointments">
          <thead>
            <tr>
              <th scope="col">Patient</th>
              <th scope="col">Doctor</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientInfo?.fullName || 'Patient'}</td>
                <td>{appointment.doctorName}</td>
                <td>{formatAppointmentDate(appointment.date)} · {appointment.time}</td>
                <td><AppointmentStatus status={appointment.status} /></td>
                <td>
                  <Link to={`/admin/appointments/${appointment.id}`} className={btn('ghost', 'sm')}>
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RecentAppointmentsTable;
