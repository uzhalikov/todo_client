import { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, duration = 3000, onHide }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onHide?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onHide]);

  if (!isVisible || !message) return null;

  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;