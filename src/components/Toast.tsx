import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  InformationCircleIcon, 
  ExclamationTriangleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

export default function ToastContainer() {
  const { state, removeToast } = useApp();
  
  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
      role="region"
      aria-label="Notifications"
    >
      {state.toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    duration?: number;
  };
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, toast.duration || 3000);
    
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onRemove]);
  
  const config = {
    success: { icon: CheckCircleIcon, bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-800', iconColor: 'text-green-500' },
    error: { icon: XCircleIcon, bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-800', iconColor: 'text-red-500' },
    info: { icon: InformationCircleIcon, bgColor: 'bg-blue-50', borderColor: 'border-blue-500', textColor: 'text-blue-800', iconColor: 'text-blue-500' },
    warning: { icon: ExclamationTriangleIcon, bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-800', iconColor: 'text-yellow-500' },
  };
  
  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[toast.type];
  
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4
        ${bgColor} ${borderColor} ${textColor}
        animate-slide-in-right min-w-72 max-w-md
      `}
      role="alert"
      aria-live="polite"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} aria-hidden="true" />
      <p className="flex-1 text-sm font-medium">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className={`p-1 rounded-full hover:bg-black/10 transition-colors ${textColor}`}
        aria-label="Dismiss notification"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
