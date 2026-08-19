import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarClock } from 'lucide-react';
import AppointmentTable from '../../components/doctorDashboard/AppointmentTable/AppointmentTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { useDoctorContext } from '../../hooks/useDoctorContext';
import { selectDoctorAppointments } from '../../features/appointments/appointmentSelectors';
import { filterDoctorAppointments } from '../../utils/doctorUtils';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { createNotification } from '../../features/notifications/notificationThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { adminFilterTab, adminFilterTabActive, adminFilterTabs, adminToolbar, btn, doctorDashboard } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';
const toolbarSelectWrap =
  '[&_select]:min-w-[180px] [&_select]:px-3 [&_select]:py-2.5 [&_select]:border-[1.5px] [&_select]:border-[var(--border-subtle)] [&_select]:rounded-md [&_select]:bg-[var(--bg-surface)] [&_select]:text-[var(--text-primary)]';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const DoctorAppointments = () => {
  const dispatch = useDispatch();
  const { doctorId } = useDoctorContext();
  const appointments = useSelector(selectDoctorAppointments(doctorId));
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [cancelTarget, setCancelTarget] = useState(null);

  const filteredAppointments = useMemo(
    () => filterDoctorAppointments(appointments, { filter, search, sort }),
    [appointments, filter, search, sort]
  );

  const handleAccept = (appointmentId) => {
    dispatch(patchAppointmentStatus({
      id: appointmentId,
      status: APPOINTMENT_STATUSES.CONFIRMED,
    }));
  };

  const handleComplete = (appointmentId) => {
    dispatch(patchAppointmentStatus({
      id: appointmentId,
      status: APPOINTMENT_STATUSES.COMPLETED,
    }));
  };

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    dispatch(patchAppointmentStatus({
      id: cancelTarget.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    dispatch(createNotification({
      role: 'doctor',
      type: 'appointment_cancelled',
      title: 'Appointment cancelled',
      message: `Appointment with ${cancelTarget.patientInfo?.fullName || 'patient'} was cancelled.`,
      date: new Date().toISOString(),
      read: false,
    }));
    setCancelTarget(null);
  };

  return (
    <div className={doctorDashboard}>
      <header className={pageIntro}>
        <p>Review, filter, and manage all appointments assigned to your practice.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by patient name or appointment ID"
          label="Search appointments"
        />
        <div className={toolbarSelectWrap}>
          <label htmlFor="appointment-sort" className="visually-hidden">Sort appointments</label>
          <select
            id="appointment-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="time">Sort by Time</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div className={adminFilterTabs} role="tablist" aria-label="Appointment filters">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            className={cn(adminFilterTab, filter === id && adminFilterTabActive)}
            onClick={() => setFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <EmptyState
          icon={<CalendarClock size={36} />}
          title="No appointments found"
          description="Try adjusting your filters or search query."
        />
      ) : (
        <AppointmentTable
          appointments={filteredAppointments}
          title={`${FILTERS.find((item) => item.id === filter)?.label} Appointments`}
          showReason
          showLocation
          compact
          onAccept={handleAccept}
          onComplete={handleComplete}
          onCancel={setCancelTarget}
        />
      )}

      <Modal
        isOpen={Boolean(cancelTarget)}
        onClose={() => setCancelTarget(null)}
        title="Cancel Appointment"
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          Are you sure you want to cancel this appointment?
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className={btn('primary')} onClick={handleConfirmCancel}>
            Yes, Cancel
          </button>
          <button type="button" className={btn('ghost')} onClick={() => setCancelTarget(null)}>
            Keep Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorAppointments;
