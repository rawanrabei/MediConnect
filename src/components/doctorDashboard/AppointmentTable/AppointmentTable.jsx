import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';
import AppointmentStatus from '../../appointment/AppointmentStatus/AppointmentStatus';
import EmptyState from '../../common/EmptyState/EmptyState';
import { cn } from '../../../utils/cn';
import { adminTable, adminTableActions, adminTableWrap, btn, panel, panelHeader } from '../../../constants/uiClasses';

const doctorAppointmentTable = cn(adminTable, 'min-w-[640px]');

const AppointmentTable = ({
  appointments,
  title = 'Appointments',
  showReason = false,
  showLocation = false,
  compact = false,
  onAccept,
  onComplete,
  onCancel,
  viewBasePath = '/doctor/appointments',
}) => {
  if (!appointments.length) {
    return (
      <section className={panel}>
        <div className={panelHeader}>
          <h3>{title}</h3>
        </div>
        <EmptyState
          icon={<CalendarClock size={32} />}
          title="No appointments"
          description="Appointments scheduled with you will appear here."
        />
      </section>
    );
  }

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>{title}</h3>
        {!compact && (
          <Link to="/doctor/appointments" className={btn('ghost', 'sm')}>
            View All
          </Link>
        )}
      </div>

      <div className={adminTableWrap}>
        <table className={doctorAppointmentTable} aria-label={title}>
          <thead>
            <tr>
              <th scope="col">Patient</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              {showReason && <th scope="col">Reason</th>}
              {showLocation && <th scope="col">Location</th>}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => {
              const patientName = appointment.patientInfo?.fullName || 'Patient';
              const reason = appointment.patientInfo?.reason || '—';
              const canAccept = appointment.status === 'pending' && onAccept;
              const canComplete =
                (appointment.status === 'confirmed' || appointment.status === 'pending') && onComplete;
              const canCancel =
                appointment.status !== 'cancelled' &&
                appointment.status !== 'completed' &&
                onCancel;

              return (
                <tr key={appointment.id}>
                  <td>{patientName}</td>
                  <td>{appointment.time}</td>
                  <td>
                    <AppointmentStatus status={appointment.status} />
                  </td>
                  {showReason && <td>{reason}</td>}
                  {showLocation && <td>{appointment.location || '—'}</td>}
                  <td>
                    <div className={adminTableActions}>
                      <Link
                        to={`${viewBasePath}/${appointment.id}`}
                        className={btn('ghost', 'sm')}
                      >
                        View Details
                      </Link>
                      {canAccept && (
                        <button
                          type="button"
                          className={btn('primary', 'sm')}
                          onClick={() => onAccept(appointment.id)}
                        >
                          Accept
                        </button>
                      )}
                      {canComplete && (
                        <button
                          type="button"
                          className={btn('primary', 'sm')}
                          onClick={() => onComplete(appointment.id)}
                        >
                          Complete
                        </button>
                      )}
                      {canCancel && (
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
    </section>
  );
};

export default AppointmentTable;
