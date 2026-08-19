import React from 'react';
import { getGreeting } from '../../../utils/adminUtils';
import { welcomeCard } from '../../../constants/uiClasses';

const AdminWelcome = ({ name }) => (
  <section className={welcomeCard} aria-label="Welcome message">
    <h2>{getGreeting()}, {name || 'Admin'}</h2>
    <p>Monitor platform activity, manage users, and oversee healthcare operations.</p>
  </section>
);

export default AdminWelcome;
