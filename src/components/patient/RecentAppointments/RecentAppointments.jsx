import React from 'react';
import { Link } from 'react-router-dom';
import AppointmentCard from '../../appointment/AppointmentCard/AppointmentCard';
import EmptyState from '../../common/EmptyState/EmptyState';
import { CalendarDays } from 'lucide-react';
import { btn, panel, panelHeader } from '../../../constants/uiClasses';

const RecentAppointments = ({ appointments }) => {
  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Recent Appointments</h3>
        <Link to="/patient/appointments" className={btn('ghost', 'sm')}>View All</Link>
      </div>
      {appointments.length === 0 ? (
        <EmptyState
          icon={<CalendarDays size={32} />}
          title="No appointments yet"
          description="Your recent appointments will appear here."
          action={<Link to="/doctors" className={btn('primary', 'sm')}>Find a Doctor</Link>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentAppointments;
