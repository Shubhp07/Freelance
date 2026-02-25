import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gray-100 p-8 rounded-full mb-6">
        <ShoppingBag className="w-24 h-24 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        Looks like you haven't added any exotic vegetables yet. Start shopping to fill your cart!
      </p>
      <Link
        to="/products"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
      >
        Browse Products
      </Link>
    </motion.div>
  );
};

export default EmptyCart;
