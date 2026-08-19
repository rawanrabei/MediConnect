import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserRound } from 'lucide-react';
import PatientsTable from '../../components/admin/PatientsTable/PatientsTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { selectPlatformPatients } from '../../features/admin/adminSelectors';
import { activateUser, suspendUser } from '../../features/admin/adminSlice';
import { filterPatients } from '../../utils/adminUtils';
import { adminDashboard, adminFilterTab, adminFilterTabActive, adminFilterTabs, adminToolbar, btn, panel } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'suspended', label: 'Suspended' },
];

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector(selectPlatformPatients);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null);

  const filteredPatients = useMemo(
    () => filterPatients(patients, { status: statusFilter, search }),
    [patients, statusFilter, search]
  );

  const handleConfirm = () => {
    if (!actionTarget) return;

    if (actionType === 'suspend') {
      dispatch(suspendUser(actionTarget.patientId));
    } else {
      dispatch(activateUser(actionTarget.patientId));
    }

    setActionTarget(null);
    setActionType(null);
  };

  return (
    <div className={adminDashboard}>
      <header className={pageIntro}>
        <p>View patients derived from platform appointments and manage account status.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by patient name or email"
          label="Search patients"
          id="admin-patient-search"
        />
      </div>

      <div className={adminFilterTabs} role="tablist" aria-label="Patient status filters">
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

      {filteredPatients.length === 0 ? (
        <EmptyState
          icon={<UserRound size={36} />}
          title="No patients found"
          description="Patients will appear here once appointments are booked."
        />
      ) : (
        <section className={panel}>
          <PatientsTable
            patients={filteredPatients}
            onSuspend={(patient) => {
              setActionTarget(patient);
              setActionType('suspend');
            }}
            onActivate={(patient) => {
              setActionTarget(patient);
              setActionType('activate');
            }}
          />
        </section>
      )}

      <Modal
        isOpen={Boolean(actionTarget)}
        onClose={() => setActionTarget(null)}
        title={actionType === 'suspend' ? 'Suspend Patient' : 'Activate Patient'}
      >
        <p className="mb-4 text-[var(--text-secondary)]">
          {actionType === 'suspend'
            ? `Are you sure you want to suspend ${actionTarget?.name}?`
            : `Are you sure you want to activate ${actionTarget?.name}?`}
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

export default Patients;
