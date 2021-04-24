import { FaExclamationTriangle } from 'react-icons/fa';

import './styles.css';

type EmptyProps = {
  icon?: any;
  message?: string;
  description?: string;
};

const Empty = ({
  icon,
  message = 'Nothing found',
  description = 'Please do something to remove this',
}: EmptyProps) => {
  return (
    <div className="empty">
      <div className="empty__img">
        {icon || <FaExclamationTriangle size={120} />}
      </div>
      <div className="empty__message">{message}</div>
      <div className="empty__description">{description}</div>
    </div>
  );
};

export default Empty;
