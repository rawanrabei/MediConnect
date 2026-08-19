import { badgeDefault, badgeSuccess, badgeWarning, badgeError } from '../../../constants/uiClasses';

const variants = {
  default: badgeDefault,
  success: badgeSuccess,
  warning: badgeWarning,
  error: badgeError,
};

const Badge = ({ children, variant = 'default' }) => {
  return <span className={variants[variant] || badgeDefault}>{children}</span>;
};

export default Badge;
