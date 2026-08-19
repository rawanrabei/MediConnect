import React from 'react';
import { specialties } from '../../../data/specialties';
import { mockLocations } from '../../../data/doctors';
import { formInput, formLabel } from '../../../constants/uiClasses';

const DoctorFilters = ({ filters, onFilterChange, idPrefix = 'filter' }) => {
  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-specialty`} className={formLabel}>Specialty</label>
        <select
          id={`${idPrefix}-specialty`}
          className={formInput}
          value={filters.specialty}
          onChange={(event) => onFilterChange('specialty', event.target.value)}
        >
          <option value="">All Specialties</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.slug}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-location`} className={formLabel}>Location</label>
        <select
          id={`${idPrefix}-location`}
          className={formInput}
          value={filters.location}
          onChange={(event) => onFilterChange('location', event.target.value)}
        >
          <option value="">All Locations</option>
          {mockLocations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-rating`} className={formLabel}>Minimum rating</label>
        <select
          id={`${idPrefix}-rating`}
          className={formInput}
          value={filters.rating}
          onChange={(event) => onFilterChange('rating', event.target.value)}
        >
          <option value="">Any rating</option>
          <option value="4.5">4.5+ stars</option>
          <option value="4">4+ stars</option>
          <option value="3">3+ stars</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-fee`} className={formLabel}>Max consultation fee</label>
        <select
          id={`${idPrefix}-fee`}
          className={formInput}
          value={filters.maxFee}
          onChange={(event) => onFilterChange('maxFee', event.target.value)}
        >
          <option value="">Any fee</option>
          <option value="400">Under 400 EGP</option>
          <option value="500">Under 500 EGP</option>
          <option value="600">Under 600 EGP</option>
          <option value="700">Under 700 EGP</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-experience`} className={formLabel}>Experience</label>
        <select
          id={`${idPrefix}-experience`}
          className={formInput}
          value={filters.experience}
          onChange={(event) => onFilterChange('experience', event.target.value)}
        >
          <option value="">Any experience</option>
          <option value="5">5+ years</option>
          <option value="10">10+ years</option>
          <option value="15">15+ years</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-availability`} className={formLabel}>Availability</label>
        <select
          id={`${idPrefix}-availability`}
          className={formInput}
          value={filters.availability}
          onChange={(event) => onFilterChange('availability', event.target.value)}
        >
          <option value="">Any availability</option>
          <option value="available">Available</option>
          <option value="today">Available today</option>
          <option value="tomorrow">Available tomorrow</option>
          <option value="week">Available this week</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-gender`} className={formLabel}>Gender</label>
        <select
          id={`${idPrefix}-gender`}
          className={formInput}
          value={filters.gender}
          onChange={(event) => onFilterChange('gender', event.target.value)}
        >
          <option value="">Any gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
    </div>
  );
};

export default DoctorFilters;
