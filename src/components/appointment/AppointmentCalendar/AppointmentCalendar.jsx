import React, { useState } from 'react';
import { btnGhost } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const AppointmentCalendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <button
          key={i}
          type="button"
          className={cn(
            btnGhost,
            'min-h-[42px] p-2 text-[var(--text-sm)]',
          )}
          onClick={() => onDateSelect(i, currentDate.getMonth(), currentDate.getFullYear())}
        >
          {i}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
        >
          Previous
        </button>
        <h3 className="text-[var(--text-primary)] font-semibold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button
          type="button"
          className={btnGhost}
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-[var(--text-sm)] font-semibold text-[var(--text-muted)] p-2">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default AppointmentCalendar;
