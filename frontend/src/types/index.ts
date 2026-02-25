export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number;
  discount_percent: number;
  category: string;
  image_url: string;
  origin_country: string;
  shelf_life: string;
  is_organic: boolean;
  stock: number;
  unit: string;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_slot: string;
  payment_method: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  status: "Ordered" | "Packed" | "Out for Delivery" | "Delivered";
  created_at?: string;
  updated_at?: string;
}

export interface Address {
  street: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}
