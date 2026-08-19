import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { specialties } from '../../../data/specialties';
import { mockLocations } from '../../../data/doctors';
import { btnPrimary, formInput, formLabel } from '../../../constants/uiClasses';
import { cn } from '../../../utils/cn';

const INITIAL_VALUES = {
  name: '',
  specialty: '',
  location: '',
  date: '',
};

const DoctorSearch = ({
  initialValues = INITIAL_VALUES,
  onSearch,
  heading = 'Find the right doctor for you',
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ ...INITIAL_VALUES, ...initialValues });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSearch) {
      onSearch(form);
      return;
    }

    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    const query = params.toString();
    navigate(query ? `/doctors?${query}` : '/doctors');
  };

  return (
    <section
      className={cn(
        'bg-[var(--bg-surface)] border border-[rgba(255,255,255,0.8)] rounded-3xl shadow-glow p-8',
        'dark:border-[var(--border-subtle)] dark:shadow-lg',
        'max-sm:p-6',
      )}
      aria-labelledby="doctor-search-heading"
    >
      <div className="mb-6">
        <h2 id="doctor-search-heading" className="text-[var(--text-xl)] text-[var(--text-primary)] tracking-[-0.02em]">
          {heading}
        </h2>
      </div>

      <form
        className="grid grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-4 items-end max-[1024px]:grid-cols-2 max-sm:grid-cols-1"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 min-w-0">
          <label htmlFor="doctor-name" className={formLabel}>Doctor name</label>
          <input
            id="doctor-name"
            name="name"
            type="search"
            className={cn(formInput, 'min-h-12 bg-[var(--gray-50)] focus:bg-[var(--bg-surface)]')}
            placeholder="Search by name"
            value={form.name}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label htmlFor="doctor-specialty" className={formLabel}>Specialty</label>
          <select
            id="doctor-specialty"
            name="specialty"
            className={cn(formInput, 'min-h-12 bg-[var(--gray-50)] focus:bg-[var(--bg-surface)]')}
            value={form.specialty}
            onChange={handleChange}
          >
            <option value="">All specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.slug}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label htmlFor="doctor-location" className={formLabel}>Location</label>
          <select
            id="doctor-location"
            name="location"
            className={cn(formInput, 'min-h-12 bg-[var(--gray-50)] focus:bg-[var(--bg-surface)]')}
            value={form.location}
            onChange={handleChange}
          >
            <option value="">City / area</option>
            {mockLocations.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 min-w-0">
          <label htmlFor="doctor-date" className={formLabel}>Preferred date</label>
          <input
            id="doctor-date"
            name="date"
            type="date"
            className={cn(formInput, 'min-h-12 bg-[var(--gray-50)] focus:bg-[var(--bg-surface)]')}
            min={new Date().toISOString().split('T')[0]}
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className={cn(btnPrimary, 'min-h-12 whitespace-nowrap max-[1024px]:col-span-full')}
        >
          <Search size={18} aria-hidden="true" />
          Search Doctors
        </button>
      </form>
    </section>
  );
};

export default DoctorSearch;
