import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FloatingCartButtonProps {
  onClick: () => void;
}

const FloatingCartButton = ({ onClick }: FloatingCartButtonProps) => {
  const { getCartCount, getCartTotal } = useCart();

  if (getCartCount() === 0) return null;

  return (
    <motion.button
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-20 md:bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-green-700 transition-colors z-30 flex items-center space-x-3"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
        >
          {getCartCount()}
        </motion.span>
      </div>
      <div className="hidden md:block text-left">
        <p className="text-xs opacity-90">View Cart</p>
        <p className="font-bold">₹{getCartTotal().toFixed(2)}</p>
      </div>
    </motion.button>
  );
};

export default FloatingCartButton;
