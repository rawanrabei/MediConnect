import { cn } from '../../../utils/cn';
import { formGroup, formLabel, formInput, fieldError } from '../../../constants/uiClasses';

const Input = ({ label, type = 'text', value, onChange, placeholder, error, className, ...props }) => {
  return (
    <div className={formGroup}>
      {label && <label className={formLabel}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(formInput, error && 'border-[var(--error)]', className)}
        {...props}
      />
      {error && <span className={fieldError}>{error}</span>}
    </div>
  );
};

export default Input;
