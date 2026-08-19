import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-[90%] max-w-[500px] overflow-y-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] p-5">
          <h2 id="modal-title" className="m-0 text-xl font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border-none bg-transparent p-0 text-[28px] text-[var(--text-muted)] hover:bg-[var(--gray-100)] hover:text-[var(--text-primary)]"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="p-5 text-[var(--text-secondary)]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
