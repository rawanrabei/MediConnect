import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Users as UsersIcon } from 'lucide-react';
import UsersTable from '../../components/admin/UsersTable/UsersTable';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Modal from '../../components/common/Modal/Modal';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import { selectPlatformUsers } from '../../features/admin/adminSelectors';
import { activateUser, suspendUser } from '../../features/admin/adminSlice';
import { filterUsers } from '../../utils/adminUtils';
import { adminDashboard, adminFilterTab, adminFilterTabActive, adminFilterTabs, adminToolbar, btn, panel } from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';

const ROLE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'patient', label: 'Patients' },
  { id: 'doctor', label: 'Doctors' },
  { id: 'admin', label: 'Admins' },
];

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectPlatformUsers);
  const [roleFilter, setRoleFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState(null);

  const filteredUsers = useMemo(
    () => filterUsers(users, { role: roleFilter, search }),
    [users, roleFilter, search]
  );

  const openAction = (user, type) => {
    setActionTarget(user);
    setActionType(type);
  };

  const handleConfirm = () => {
    if (!actionTarget) return;

    if (actionType === 'suspend') {
      dispatch(suspendUser(actionTarget.id));
    } else {
      dispatch(activateUser(actionTarget.id));
    }

    setActionTarget(null);
    setActionType(null);
  };

  return (
    <div className={adminDashboard}>
      <header className={pageIntro}>
        <p>Manage platform users, roles, and account status across MediConnect.</p>
      </header>

      <div className={adminToolbar}>
        <SearchBar
          value={search}
          onSearch={setSearch}
          placeholder="Search by name or email"
          label="Search users"
          id="admin-user-search"
        />
      </div>

      <div className={adminFilterTabs} role="tablist" aria-label="User role filters">
        {ROLE_FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={roleFilter === id}
            className={cn(adminFilterTab, roleFilter === id && adminFilterTabActive)}
            onClick={() => setRoleFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={<UsersIcon size={36} />}
          title="No users found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <section className={panel}>
          <UsersTable
            users={filteredUsers}
            onSuspend={(user) => openAction(user, 'suspend')}
            onActivate={(user) => openAction(user, 'activate')}
          />
        </section>
      )}

      <Modal
        isOpen={Boolean(actionTarget)}
        onClose={() => setActionTarget(null)}
        title={actionType === 'suspend' ? 'Suspend User' : 'Activate User'}
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

export default Users;
