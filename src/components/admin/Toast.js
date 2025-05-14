import React, { useEffect } from 'react';
import { ToastContainer, Toast } from './AdminStyles';

const ToastNotification = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <ToastContainer>
      <Toast type={type}>
        {message}
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification; 