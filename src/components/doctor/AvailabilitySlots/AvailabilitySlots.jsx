import React from 'react';
import { panel } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const AvailabilitySlots = ({ slots = [], selectedSlot, onSlotSelect }) => {
  if (!slots.length) {
    return (
      <section className={panel} aria-labelledby="slots-heading">
        <h2 id="slots-heading" className="mb-6 text-[1.15rem]">Available Appointments</h2>
        <p className="text-[var(--text-secondary)]">No appointment slots are currently available.</p>
      </section>
    );
  }

  return (
    <section className={panel} aria-labelledby="slots-heading">
      <h2 id="slots-heading" className="mb-6 text-[1.15rem]">Available Appointments</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
        {slots.map((day) => (
          <div key={day.date}>
            <h3 className="text-[0.95rem] mb-2 text-[var(--text-primary)]">{day.label}</h3>
            <div className="grid gap-2" role="list">
              {day.times.map((time) => {
                const isSelected = selectedSlot?.date === day.date && selectedSlot?.time === time;
                return (
                  <button
                    key={`${day.date}-${time}`}
                    type="button"
                    className={cn(
                      'min-h-[42px] border-[1.5px] rounded-md font-semibold cursor-pointer',
                      'transition-[border-color,background-color,color] duration-150',
                      isSelected
                        ? 'bg-[var(--primary-600)] border-[var(--primary-600)] text-white'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--primary-300)] hover:bg-[var(--primary-50)]',
                    )}
                    aria-pressed={isSelected}
                    onClick={() => onSlotSelect({ date: day.date, time, label: day.label })}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailabilitySlots;
