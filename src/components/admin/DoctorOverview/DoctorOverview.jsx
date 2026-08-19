import React from 'react';
import { adminOverviewGrid, adminOverviewItem, panel, panelHeader } from '../../../constants/uiClasses';

const DoctorOverview = ({ overview }) => (
  <section className={panel}>
    <div className={panelHeader}>
      <h3>Doctor Overview</h3>
    </div>
    <div className={adminOverviewGrid}>
      <article className={adminOverviewItem}>
        <strong>{overview.approved}</strong>
        <span>Approved</span>
      </article>
      <article className={adminOverviewItem}>
        <strong>{overview.pending}</strong>
        <span>Pending</span>
      </article>
      <article className={adminOverviewItem}>
        <strong>{overview.suspended}</strong>
        <span>Suspended</span>
      </article>
    </div>
  </section>
);

export default DoctorOverview;
