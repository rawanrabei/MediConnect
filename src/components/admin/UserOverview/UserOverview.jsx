import React from 'react';
import { adminOverviewGrid, adminOverviewItem, panel, panelHeader } from '../../../constants/uiClasses';

const UserOverview = ({ data }) => (
  <section className={panel}>
    <div className={panelHeader}>
      <h3>User Overview</h3>
    </div>
    <div className={adminOverviewGrid}>
      {data.map((item) => (
        <article key={item.name} className={adminOverviewItem}>
          <strong>{item.value}</strong>
          <span>{item.name}</span>
        </article>
      ))}
    </div>
  </section>
);

export default UserOverview;
