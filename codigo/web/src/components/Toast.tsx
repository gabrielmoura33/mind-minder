import React from 'react';
import {
  FaBug,
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfo,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export const displayIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <FaCheck />;
    case 'info':
      return <FaInfo />;
    case 'error':
      return <FaExclamationCircle />;
    case 'warning':
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

type ToastType = 'success' | 'warning' | 'error' | 'info';
interface ToastProps {
  type: ToastType;
  message: string;
}
const ToastMessage = ({ type, message }: ToastProps) =>
  toast[type](
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
        {message}
      </div>
    </div>
  );

export default ToastMessage;
