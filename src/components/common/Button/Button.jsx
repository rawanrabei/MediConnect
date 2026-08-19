import { cn } from '../../../utils/cn';
import { btnPrimary, btnSecondary, btnOutline, btnSm, btnLg } from '../../../constants/uiClasses';

const Button = ({ children, variant = 'primary', size = 'medium', disabled, onClick, className, ...props }) => {
  const variantClass =
    variant === 'secondary' ? btnSecondary : variant === 'outline' ? btnOutline : btnPrimary;
  const sizeClass = size === 'small' ? btnSm : size === 'large' ? btnLg : '';

  return (
    <button
      className={cn(variantClass, sizeClass, disabled && 'cursor-not-allowed opacity-50', className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
