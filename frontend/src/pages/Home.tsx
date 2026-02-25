import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Leaf, TrendingUp, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Leafy', emoji: '🥬', color: 'bg-green-100 text-green-700' },
    { name: 'Mushrooms', emoji: '🍄', color: 'bg-amber-100 text-amber-700' },
    { name: 'Imported', emoji: '✈️', color: 'bg-blue-100 text-blue-700' },
    { name: 'Organic', emoji: '🌱', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Herbs', emoji: '🌿', color: 'bg-lime-100 text-lime-700' },
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🚀 Fast Delivery in 30 Minutes
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fresh{' '}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Exotic Vegetables
                </span>{' '}
                Delivered
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Premium quality exotic vegetables sourced from the best farms around the world.
                Fresh, healthy, and delivered to your doorstep in minutes.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fresh Vegetables"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md text-center"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">30 Min Delivery</h3>
            <p className="text-sm text-gray-500">Lightning fast</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md text-center"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">100% Fresh</h3>
            <p className="text-sm text-gray-500">Farm fresh</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl shadow-md text-center"
          >
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Best Prices</h3>
            <p className="text-sm text-gray-500">Great deals</p>
          </motion.div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`${category.color} p-6 rounded-2xl font-semibold text-center transition-all hover:shadow-lg`}
              >
                <div className="text-4xl mb-2">{category.emoji}</div>
                <div>{category.name}</div>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/products"
              className="text-green-600 hover:text-green-700 font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
