import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stethoscope } from 'lucide-react';
import DoctorsTable from '../../components/admin/DoctorsTable/DoctorsTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { selectPlatformDoctors } from '../../features/admin/adminSelectors';
import { selectAllDoctors } from '../../features/doctors/doctorSelectors';
import { approveDoctor, suspendDoctor } from '../../features/admin/adminSlice';
import { filterDoctors } from '../../utils/adminUtils';
import { adminDashboard, adminFilterTab, adminFilterTabActive, adminFilterTabs, adminToolbar, btn, panel } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';
const toolbarSelectWrap =
  '[&_select]:min-w-[180px] [&_select]:px-3 [&_select]:py-2.5 [&_select]:border-[1.5px] [&_select]:border-[var(--border-subtle)] [&_select]:rounded-md [&_select]:bg-[var(--bg-surface)] [&_select]:text-[var(--text-primary)]';

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'approved', label: 'Approved' },
  { id: 'pending', label: 'Pending' },
  { id: 'suspended', label: 'Suspended' },
];

const Doctors = () => {
  const dispatch = useDispatch();
  const doctors = useSelector(selectPlatformDoctors);
  const allDoctors = useSelector(selectAllDoctors);
  const specialties = useMemo(
    () => [...new Set(allDoctors.map((doctor) => doctor.specialty))].sort(),
    [allDoctors]
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null);

  const filteredDoctors = useMemo(
    () => filterDoctors(doctors, { status: statusFilter, specialty: specialtyFilter, search }),
    [doctors, statusFilter, specialtyFilter, search]
  );

  const openAction = (doctor, type) => {
    setActionTarget(doctor);
    setActionType(type);
  };

  const handleConfirm = () => {
    if (!actionTarget) return;

    if (actionType === 'suspend') {
      dispatch(suspendDoctor(actionTarget.id));
    } else {
      dispatch(approveDoctor(actionTarget.id));
    }

    setActionTarget(null);
    setActionType(null);
  };

  return (
    <div className={adminDashboard}>
      <header className={pageIntro}>
        <p>Review doctor profiles, approve new registrations, and manage doctor status.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by name, specialty, or location"
          label="Search doctors"
          id="admin-doctor-search"
        />
        <div className={toolbarSelectWrap}>
          <label htmlFor="specialty-filter" className="visually-hidden">Filter by specialty</label>
          <select
            id="specialty-filter"
            value={specialtyFilter}
            onChange={(event) => setSpecialtyFilter(event.target.value)}
          >
            <option value="all">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={adminFilterTabs} role="tablist" aria-label="Doctor status filters">
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

      {filteredDoctors.length === 0 ? (
        <EmptyState
          icon={<Stethoscope size={36} />}
          title="No doctors found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <section className={panel}>
          <DoctorsTable
            doctors={filteredDoctors}
            onApprove={(doctor) => openAction(doctor, 'approve')}
            onSuspend={(doctor) => openAction(doctor, 'suspend')}
          />
        </section>
      )}

      <Modal
        isOpen={Boolean(actionTarget)}
        onClose={() => setActionTarget(null)}
        title={actionType === 'suspend' ? 'Suspend Doctor' : 'Approve Doctor'}
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          {actionType === 'suspend'
            ? `Are you sure you want to suspend ${actionTarget?.name}?`
            : `Are you sure you want to approve ${actionTarget?.name}?`}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button type="button" className={btn('primary')} onClick={handleConfirm}>
            Confirm
          </button>
          <button type="button" className={btn('ghost')} onClick={() => setActionTarget(null)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Doctors;
