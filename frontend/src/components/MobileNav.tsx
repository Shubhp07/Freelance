import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingCart, User, Gauge } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileNavProps {
  onCartClick: () => void;
}

const MobileNav = ({ onCartClick }: MobileNavProps) => {
  const location = useLocation();
  const { getCartCount } = useCart();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/products', icon: Grid, label: 'Products' },
    { path: '/orders', icon: User, label: 'Orders' },
    { path: '/admin', icon: Gauge, label: 'Admin' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              location.pathname === item.path
                ? 'text-green-600'
                : 'text-gray-500 hover:text-green-600'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={onCartClick}
          className="flex flex-col items-center justify-center space-y-1 text-gray-500 hover:text-green-600 transition-colors relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs font-medium">Cart</span>
          {getCartCount() > 0 && (
            <span className="absolute top-1 right-1/4 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {getCartCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
