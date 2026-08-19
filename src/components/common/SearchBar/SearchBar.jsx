import { Search } from 'lucide-react';

const SearchBar = ({
  value = '',
  onSearch,
  placeholder = 'Search...',
  label = 'Search',
  id = 'doctor-search-input',
}) => {
  const handleChange = (event) => {
    onSearch?.(event.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[var(--text-sm)] font-semibold text-[var(--text-secondary)]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="min-h-12 w-full rounded-md border-[1.5px] border-[var(--border-subtle)] bg-[var(--bg-surface)] py-0 pl-3.5 pr-11 text-[15px] text-[var(--text-primary)] focus:border-[var(--primary-600)] focus:shadow-[0_0_0_3px_var(--primary-100)] focus:outline-none"
          autoComplete="off"
        />
        <span className="pointer-events-none absolute right-3.5 top-1/2 flex -translate-y-1/2 text-[var(--gray-400)]" aria-hidden="true">
          <Search size={18} />
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
