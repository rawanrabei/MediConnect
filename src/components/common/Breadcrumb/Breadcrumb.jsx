import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-[var(--text-sm)] text-[var(--text-muted)]" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.label} className="inline-flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {isLast || !item.to ? (
              <span className="font-semibold text-[var(--text-primary)]" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="font-semibold text-[var(--text-accent)] no-underline hover:underline">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
