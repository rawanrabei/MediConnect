import React from 'react';
import { getGreeting } from '../../../utils/patientUtils';
import { welcomeCard } from '../../../constants/uiClasses';

const PatientWelcome = ({ name }) => {
  const greeting = getGreeting();
  const firstName = name?.split(' ')[0] || 'there';

  return (
    <section className={welcomeCard} aria-labelledby="patient-welcome-heading">
      <h2 id="patient-welcome-heading">{greeting}, {firstName}</h2>
      <p>
        Manage your appointments, discover doctors, and stay connected with your
        healthcare providers.
      </p>
    </section>
  );
};

export default PatientWelcome;
