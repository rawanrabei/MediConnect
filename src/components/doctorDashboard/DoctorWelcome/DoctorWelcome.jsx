import React from 'react';
import { getGreeting } from '../../../utils/doctorUtils';
import { welcomeCard } from '../../../constants/uiClasses';

const DoctorWelcome = ({ name }) => {
  const displayName = name || 'Doctor';

  return (
    <section className={welcomeCard} aria-label="Welcome message">
      <h2>{getGreeting()}, {displayName}</h2>
      <p>Here's an overview of your appointments and patients.</p>
    </section>
  );
};

export default DoctorWelcome;
