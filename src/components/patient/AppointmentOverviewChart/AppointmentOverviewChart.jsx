import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { appointmentChartWrap, panel, panelHeader, supportText } from '../../../constants/uiClasses';
import { chartTick, chartTooltipLabelStyle, chartTooltipStyle } from '../../../utils/chartTheme';

const AppointmentOverviewChart = ({ data }) => {
  const hasData = data.some((item) => item.value > 0);

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>Appointment Overview</h3>
      </div>
      {!hasData ? (
        <p className={supportText}>Book appointments to see your overview chart.</p>
      ) : (
        <div className={appointmentChartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--gray-200)" />
              <XAxis dataKey="name" tick={chartTick} />
              <YAxis allowDecimals={false} tick={chartTick} />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipLabelStyle} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default AppointmentOverviewChart;
