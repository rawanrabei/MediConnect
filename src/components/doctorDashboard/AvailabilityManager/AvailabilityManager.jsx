import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initializeDoctorAvailability,
  setDoctorAvailability,
} from '../../../features/doctors/doctorPortalSlice';
import { selectDoctorAvailability } from '../../../features/doctors/doctorPortalSelectors';
import { DEFAULT_AVAILABILITY } from '../../../data/mockDoctorPortal';
import { useDoctorContext } from '../../../hooks/useDoctorContext';
import { formGroup, formInput, formLabel, panel, panelHeader, supportText } from '../../../constants/uiClasses';

const profileGrid = 'grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6';
const doctorPatientList = 'grid gap-4';
const scheduleRow = 'grid grid-cols-[1fr_2fr] gap-4 items-center py-3.5 border-b border-[var(--border-subtle)] text-[var(--text-sm)] last:border-b-0';

const formatTimeLabel = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
};

const AvailabilityManager = () => {
  const dispatch = useDispatch();
  const { doctorId } = useDoctorContext();
  const availability = useSelector(selectDoctorAvailability(doctorId)) || DEFAULT_AVAILABILITY;

  useEffect(() => {
    if (doctorId) {
      dispatch(initializeDoctorAvailability(doctorId));
    }
  }, [dispatch, doctorId]);

  const updateScheduleDay = (day, updates) => {
    const schedule = availability.schedule.map((entry) =>
      entry.day === day ? { ...entry, ...updates } : entry
    );
    dispatch(setDoctorAvailability({ doctorId, availability: { ...availability, schedule } }));
  };

  const updateSetting = (field, value) => {
    dispatch(setDoctorAvailability({
      doctorId,
      availability: { ...availability, [field]: Number(value) || 0 },
    }));
  };

  return (
    <div>
      <section className={`${panel} mb-6`}>
        <div className={panelHeader}>
          <h3>Schedule Settings</h3>
        </div>
        <div className={profileGrid}>
          <div className={formGroup}>
            <label htmlFor="appointmentDuration" className={formLabel}>Appointment Duration (minutes)</label>
            <input
              id="appointmentDuration"
              type="number"
              min="15"
              step="15"
              className={formInput}
              value={availability.appointmentDuration}
              onChange={(event) => updateSetting('appointmentDuration', event.target.value)}
            />
          </div>
          <div className={formGroup}>
            <label htmlFor="breakMinutes" className={formLabel}>Break Time (minutes)</label>
            <input
              id="breakMinutes"
              type="number"
              min="0"
              step="5"
              className={formInput}
              value={availability.breakMinutes}
              onChange={(event) => updateSetting('breakMinutes', event.target.value)}
            />
          </div>
        </div>
      </section>

      <section className={panel}>
        <div className={panelHeader}>
          <h3>Weekly Schedule</h3>
        </div>
        <div className={doctorPatientList}>
          {availability.schedule.map((dayEntry) => (
            <article key={dayEntry.day} className={scheduleRow}>
              <div>
                <strong>{dayEntry.day}</strong>
                <label className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={dayEntry.enabled}
                    onChange={(event) => updateScheduleDay(dayEntry.day, { enabled: event.target.checked })}
                    aria-label={`${dayEntry.day} working day`}
                  />
                  {dayEntry.enabled ? 'Working day' : 'OFF'}
                </label>
              </div>
              {dayEntry.enabled ? (
                <div className="flex flex-wrap items-center gap-3">
                  <div className={`${formGroup} m-0`}>
                    <label htmlFor={`start-${dayEntry.day}`} className={formLabel}>Start</label>
                    <input
                      id={`start-${dayEntry.day}`}
                      type="time"
                      className={formInput}
                      value={dayEntry.startTime}
                      onChange={(event) => updateScheduleDay(dayEntry.day, { startTime: event.target.value })}
                    />
                  </div>
                  <div className={`${formGroup} m-0`}>
                    <label htmlFor={`end-${dayEntry.day}`} className={formLabel}>End</label>
                    <input
                      id={`end-${dayEntry.day}`}
                      type="time"
                      className={formInput}
                      value={dayEntry.endTime}
                      onChange={(event) => updateScheduleDay(dayEntry.day, { endTime: event.target.value })}
                    />
                  </div>
                  <p className={`${supportText} m-0`}>
                    {formatTimeLabel(dayEntry.startTime)} — {formatTimeLabel(dayEntry.endTime)}
                  </p>
                </div>
              ) : (
                <p className={`${supportText} m-0`}>Not available</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AvailabilityManager;
