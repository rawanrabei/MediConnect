import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Stethoscope } from 'lucide-react';
import DoctorCard from '../../components/doctor/DoctorCard/DoctorCard';
import DoctorFilters from '../../components/doctor/DoctorFilters/DoctorFilters';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import Loader from '../../components/common/Loader/Loader';
import Pagination from '../../components/common/Pagination/Pagination';
import Modal from '../../components/common/Modal/Modal';
import {
  selectAllDoctors,
  selectDoctorsError,
  selectDoctorsLoading,
} from '../../features/doctors/doctorSelectors';
import {
  filterDoctors,
  hasActiveDoctorFilters,
  parseDoctorQuery,
  sortDoctors,
  toDoctorQuery,
} from '../../utils/filterDoctors';
import {
  btnGhost,
  btnPrimary,
  container,
  formInput,
  formLabel,
  pagePadding,
  panel,
  sectionTitle,
  supportText,
} from '../../constants/uiClasses';
import { cn } from '../../utils/cn';

const PAGE_SIZE = 8;

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const doctors = useSelector(selectAllDoctors);
  const loading = useSelector(selectDoctorsLoading);
  const error = useSelector(selectDoctorsError);

  const filters = parseDoctorQuery(searchParams);
  const filtered = sortDoctors(filterDoctors(doctors, filters), filters.sort);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedDoctors = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const filtersActive = hasActiveDoctorFilters(filters);

  const updateFilters = (updates) => {
    const nextFilters = { ...filters, ...updates };
    setPage(1);
    setSearchParams(toDoctorQuery(nextFilters), { replace: true });
  };

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const clearFilters = () => {
    setPage(1);
    setSearchParams(new URLSearchParams(), { replace: true });
    setFiltersOpen(false);
  };

  return (
    <div className={cn(pagePadding, 'max-sm:py-8')}>
      <div className={container}>
        <header className="mb-8 max-w-[640px]">
          <h1 className={sectionTitle}>Find the right doctor for you</h1>
          <p className={cn(supportText, 'mt-2 text-[var(--text-md)]')}>
            Browse trusted healthcare professionals and find an appointment that
            fits your needs.
          </p>
        </header>

        {error && (
          <p className="text-[var(--text-danger)] mb-4" role="alert">
            {error}
          </p>
        )}

        <div className="grid grid-cols-[260px_1fr] gap-8 items-start max-[1100px]:grid-cols-1">
          <aside
            className={cn(
              panel,
              'p-6 sticky top-[calc(var(--navbar-height)+16px)] max-[1100px]:hidden',
            )}
            aria-label="Doctor filters"
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <h2 className="text-base text-[var(--text-primary)]">Filters</h2>
              {filtersActive && (
                <button
                  type="button"
                  className="bg-transparent border-none text-[var(--text-accent)] font-semibold text-[var(--text-sm)] cursor-pointer p-0"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              )}
            </div>
            <DoctorFilters filters={filters} onFilterChange={handleFilterChange} />
          </aside>

          <div>
            <div className="grid grid-cols-[1fr_auto] gap-4 items-end mb-6 max-[1100px]:grid-cols-1">
              <SearchBar
                value={filters.name}
                onSearch={(value) => handleFilterChange('name', value)}
                placeholder="Search by doctor name or specialty"
                label="Search doctors"
              />
              <div className="flex flex-col gap-2 min-w-[220px] max-sm:min-w-0">
                <label htmlFor="doctor-sort" className={formLabel}>Sort by</label>
                <select
                  id="doctor-sort"
                  className={cn(formInput, 'min-h-12')}
                  value={filters.sort}
                  onChange={(event) => handleFilterChange('sort', event.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="fee">Lowest Consultation Fee</option>
                  <option value="experience">Highest Experience</option>
                </select>
              </div>
              <button
                type="button"
                className={cn(btnGhost, 'hidden max-[1100px]:inline-flex')}
                onClick={() => setFiltersOpen(true)}
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filters
              </button>
            </div>

            <div className="flex justify-between items-center gap-4 mb-6">
              <p className={supportText}>
                <strong className="text-[var(--text-primary)]">{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'doctor found' : 'doctors found'}
              </p>
              {filtersActive && (
                <button
                  type="button"
                  className="bg-transparent border-none text-[var(--text-accent)] font-semibold text-[var(--text-sm)] cursor-pointer p-0"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {loading ? (
              <Loader />
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={<Stethoscope size={36} />}
                title="No doctors found"
                description="Try adjusting your search or filters."
                action={(
                  <button type="button" className={btnPrimary} onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              />
            ) : (
              <>
                <div className="grid grid-cols-3 gap-6 max-[1100px]:grid-cols-2 max-sm:grid-cols-1 [&>*]:min-h-full">
                  {pagedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
      >
        <DoctorFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          idPrefix="mobile-filter"
        />
        {filtersActive && (
          <button
            type="button"
            className={cn(btnGhost, 'w-full mt-4')}
            onClick={clearFilters}
          >
            Clear All Filters
          </button>
        )}
      </Modal>
    </div>
  );
};

export default Doctors;
