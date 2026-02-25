import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Toast = ({ message, type = 'success' }: ToastProps) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg ${bgColors[type]} backdrop-blur-sm`}
    >
      {icons[type]}
      <p className="text-sm font-medium text-gray-800">{message}</p>
    </motion.div>
  );
};

export default Toast;
