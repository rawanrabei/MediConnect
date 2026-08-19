import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { chartTick, chartTooltipLabelStyle, chartTooltipStyle } from '../../../utils/chartTheme';
import { adminChartWrap, panel, panelHeader, supportText } from '../../../constants/uiClasses';

const AdminAppointmentChart = ({ data, title = 'Appointments by Status' }) => {
  const hasData = data.some((item) => item.value > 0);

  return (
    <section className={panel}>
      <div className={panelHeader}>
        <h3>{title}</h3>
      </div>
      {!hasData ? (
        <p className={supportText}>Appointment analytics will appear once bookings are recorded.</p>
      ) : (
        <div className={adminChartWrap}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--gray-200)" />
              <XAxis dataKey="name" tick={chartTick} />
              <YAxis allowDecimals={false} tick={chartTick} />
              <Tooltip contentStyle={chartTooltipStyle} labelStyle={chartTooltipLabelStyle} itemStyle={chartTooltipLabelStyle} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default AdminAppointmentChart;
