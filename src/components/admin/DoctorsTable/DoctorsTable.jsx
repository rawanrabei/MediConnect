import React from 'react';
import StatusBadge from '../StatusBadge/StatusBadge';
import StarRating from '../../common/StarRating/StarRating';
import { adminTable, adminTableActions, adminTableWrap, btn, supportText } from '../../../constants/uiClasses';

const DoctorsTable = ({ doctors, onApprove, onSuspend }) => {
  if (!doctors.length) {
    return <p className={supportText}>No doctors found.</p>;
  }

  return (
    <div className={adminTableWrap}>
      <table className={adminTable} aria-label="Doctors">
        <thead>
          <tr>
            <th scope="col">Doctor</th>
            <th scope="col">Specialty</th>
            <th scope="col">Experience</th>
            <th scope="col">Rating</th>
            <th scope="col">Location</th>
            <th scope="col">Fee</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.experience} yrs</td>
              <td><StarRating rating={doctor.rating} /></td>
              <td>{doctor.location}</td>
              <td>{doctor.consultationFee} {doctor.currency || 'EGP'}</td>
              <td><StatusBadge status={doctor.status} /></td>
              <td>
                <div className={adminTableActions}>
                  {doctor.status === 'pending' && (
                    <button
                      type="button"
                      className={btn('primary', 'sm')}
                      onClick={() => onApprove(doctor)}
                    >
                      Approve
                    </button>
                  )}
                  {doctor.status !== 'suspended' && (
                    <button
                      type="button"
                      className={btn('outline', 'sm')}
                      onClick={() => onSuspend(doctor)}
                    >
                      Suspend
                    </button>
                  )}
                  {doctor.status === 'suspended' && (
                    <button
                      type="button"
                      className={btn('primary', 'sm')}
                      onClick={() => onApprove(doctor)}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsTable;
