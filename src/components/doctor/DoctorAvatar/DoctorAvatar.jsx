import React from 'react';
import { getDoctorPhoto } from '../../../data/doctorImages';
import { cn } from '../../../utils/cn';

const DoctorAvatar = ({ doctor, size = 72 }) => {
  const photo = doctor?.image || getDoctorPhoto(doctor?.id);
  const available = Boolean(doctor?.available);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="rounded-full overflow-hidden bg-[var(--primary-50)] border border-[var(--primary-100)]"
        style={{ width: size, height: size }}
      >
        <img
          src={photo}
          alt={doctor?.name ? `Portrait of ${doctor.name}` : 'Doctor'}
          loading="lazy"
          className="w-full h-full object-cover block"
        />
      </div>
      <span
        className={cn(
          'absolute right-0.5 bottom-0.5 w-3 h-3 rounded-full border-2 border-white bg-[var(--gray-400)]',
          available && 'bg-[var(--success)]',
        )}
        aria-hidden="true"
      />
    </div>
  );
};

export default DoctorAvatar;
