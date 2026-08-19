import { cn } from '../../../utils/cn';
import { loader, spinner } from '../../../constants/uiClasses';

const Loader = ({ size = 'medium' }) => {
  return (
    <div className={cn(loader, size === 'small' && 'p-4', size === 'large' && 'p-12')}>
      <div className={spinner} />
    </div>
  );
};

export default Loader;
