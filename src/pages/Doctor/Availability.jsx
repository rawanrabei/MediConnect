import React from 'react';
import AvailabilityManager from '../../components/doctorDashboard/AvailabilityManager/AvailabilityManager';
import { doctorDashboard } from '../../constants/uiClasses';

const pageIntro = '[&_p]:text-[var(--text-secondary)] [&_p]:max-w-[720px]';

const Availability = () => {
  return (
    <div className={doctorDashboard}>
      <header className={pageIntro}>
        <p>Configure your weekly working hours, appointment duration, and break times.</p>
      </header>
      <AvailabilityManager />
    </div>
  );
};

export default Availability;
