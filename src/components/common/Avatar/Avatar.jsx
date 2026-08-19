import { cn } from '../../../utils/cn';
import { getAvatarColor, getInitials } from '../../../utils/getInitials';

const Avatar = ({ name = '', size = 40, className = '' }) => {
  const initials = getInitials(name);

  return (
    <span
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-bold tracking-[0.02em] text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(12, size * 0.34),
        backgroundColor: getAvatarColor(name),
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
};

export default Avatar;
