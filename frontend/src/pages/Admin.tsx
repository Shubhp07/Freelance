import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { Product } from '../types';
import { useToast } from '../context/ToastContext';

const API_URL = "http://localhost:5000/api/products"; // change if needed

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    discount_percent: '',
    category: '',
    image_url: '',
    origin_country: '',
    shelf_life: '',
    is_organic: false,
    stock: '',
    unit: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ GET PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD / UPDATE PRODUCT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: parseFloat(formData.original_price),
      discount_percent: parseInt(formData.discount_percent),
      stock: parseInt(formData.stock),
    };

    try {
      let res;

      if (editingProduct) {
        res = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        showToast("Product updated successfully");
      } else {
        res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        showToast("Product added successfully");
      }

      if (!res.ok) throw new Error("Failed");

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Failed to save product", "error");
    }
  };

  // ✅ DELETE PRODUCT
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed");

      showToast("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete product", "error");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      price: product.price.toString(),
      original_price: product.original_price.toString(),
      discount_percent: product.discount_percent.toString(),
      stock: product.stock.toString(),
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      discount_percent: '',
      category: '',
      image_url: '',
      origin_country: '',
      shelf_life: '',
      is_organic: false,
      stock: '',
      unit: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Your full UI remains same below */}
    </div>
  );
};

export default Admin;