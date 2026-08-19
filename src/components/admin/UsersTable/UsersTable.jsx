import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import { formatCreatedDate } from '../../../utils/adminUtils';
import { adminTable, adminTableActions, adminTableWrap, btn, supportText } from '../../../constants/uiClasses';

const UsersTable = ({ users, onSuspend, onActivate }) => {
  if (!users.length) {
    return <p className={supportText}>No users found.</p>;
  }

  return (
    <div className={adminTableWrap}>
      <table className={adminTable} aria-label="Platform users">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Created Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isAdmin = user.role === 'admin';
            const isActive = user.status === 'active';

            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                <td><StatusBadge status={user.status} /></td>
                <td>{formatCreatedDate(user.createdAt)}</td>
                <td>
                  {!isAdmin && (
                    <div className={adminTableActions}>
                      {isActive ? (
                        <button
                          type="button"
                          className={btn('outline', 'sm')}
                          onClick={() => onSuspend(user)}
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={btn('primary', 'sm')}
                          onClick={() => onActivate(user)}
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
