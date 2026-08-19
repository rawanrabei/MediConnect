const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-8 py-[72px] text-center">
      {icon && <div className="mb-4 flex justify-center text-[var(--text-accent)]">{icon}</div>}
      <h3 className="mb-2 text-[var(--text-xl)] text-[var(--text-primary)]">{title}</h3>
      {description && <p className="mb-6 text-[var(--text-secondary)]">{description}</p>}
      {action && <div className="flex justify-center">{action}</div>}
    </div>
  );
};

export default EmptyState;
