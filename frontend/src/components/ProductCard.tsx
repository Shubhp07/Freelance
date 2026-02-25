import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { showToast } = useToast();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(product, 1);
    showToast(`${product.name} added to cart`);
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      updateQuantity(product.id, 0);
      showToast(`${product.name} removed from cart`, 'info');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.discount_percent > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              {product.discount_percent}% OFF
            </div>
          )}
          {product.is_organic && (
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
              ORGANIC
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.unit}</p>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.discount_percent > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.original_price}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        {quantity === 0 ? (
          <button
            onClick={handleAdd}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-green-600 text-white rounded-lg p-1">
            <button
              onClick={handleDecrement}
              className="hover:bg-green-700 p-1 rounded-lg transition-colors"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-semibold px-4">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="hover:bg-green-700 p-1 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
