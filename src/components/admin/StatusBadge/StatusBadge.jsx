import React from 'react';
import { getStatusBadgeClass } from '../../../constants/uiClasses';

const StatusBadge = ({ status, label }) => {
  const normalized = status || 'pending';
  const displayLabel = label || normalized;

  return (
    <span className={getStatusBadgeClass(normalized)}>
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
