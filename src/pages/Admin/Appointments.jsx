import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarClock } from 'lucide-react';
import AdminAppointmentsTable from '../../components/admin/AdminAppointmentsTable/AdminAppointmentsTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { selectAppointments } from '../../features/appointments/appointmentSelectors';
import { patchAppointmentStatus } from '../../features/appointments/appointmentThunks';
import { APPOINTMENT_STATUSES } from '../../utils/appointmentUtils';
import { filterAdminAppointments } from '../../utils/adminUtils';
import { adminDashboard, adminFilterTab, adminFilterTabActive, adminFilterTabs, adminToolbar, btn, panel } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';
const toolbarSelectWrap =
  '[&_select]:min-w-[180px] [&_select]:px-3 [&_select]:py-2.5 [&_select]:border-[1.5px] [&_select]:border-[var(--border-subtle)] [&_select]:rounded-md [&_select]:bg-[var(--bg-surface)] [&_select]:text-[var(--text-primary)]';

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'confirmed', label: 'Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const Appointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(selectAppointments);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('date');
  const [cancelTarget, setCancelTarget] = useState(null);

  const filteredAppointments = useMemo(
    () => filterAdminAppointments(appointments, { status: statusFilter, search, sort }),
    [appointments, statusFilter, search, sort]
  );

  const handleConfirmCancel = () => {
    if (!cancelTarget) return;
    dispatch(patchAppointmentStatus({
      id: cancelTarget.id,
      status: APPOINTMENT_STATUSES.CANCELLED,
    }));
    setCancelTarget(null);
  };

  return (
    <div className={adminDashboard}>
      <header className={pageIntro}>
        <p>Monitor and manage all appointments across the MediConnect platform.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by patient, doctor, or appointment ID"
          label="Search appointments"
          id="admin-appointment-search"
        />
        <div className={toolbarSelectWrap}>
          <label htmlFor="admin-appointment-sort" className="visually-hidden">Sort appointments</label>
          <select
            id="admin-appointment-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="time">Sort by Time</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      <div className={adminFilterTabs} role="tablist" aria-label="Appointment status filters">
        {STATUS_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={statusFilter === id}
            className={cn(adminFilterTab, statusFilter === id && adminFilterTabActive)}
            onClick={() => setStatusFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredAppointments.length === 0 ? (
        <EmptyState
          icon={<CalendarClock size={36} />}
          title="No appointments found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <section className={panel}>
          <AdminAppointmentsTable
            appointments={filteredAppointments}
            onCancel={setCancelTarget}
          />
        </section>
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

export default Appointments;
