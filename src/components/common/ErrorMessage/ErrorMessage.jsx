import { errorMessage } from '../../../constants/uiClasses';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className={errorMessage}>
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
