export type CategoryType = 
  | 'ALL'
  | 'DESKTOP'
  | 'LAPTOP'
  | 'SMARTPHONE'
  | 'AUDIO'
  | 'BAG'
  | 'ACCESSORIES'
  | 'WEAR';

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  tags: string[];
  image: string;
  condition?: string;
  specs?: string[];
  description?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerEmail?: string;
  customerPhone?: string;
  status: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  trackingEvents: {
    time: string;
    description: string;
    location: string;
    completed: boolean;
  }[];
}

export interface TrackingLog {
  trackingId: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Processing';
  estimatedDays: string;
  hubLocation: string;
  recipientEmail?: string;
  orderDate?: string;
  items?: CartItem[];
  subtotal?: number;
  total?: number;
  currentStepIndex?: number;
  events: {
    time: string;
    description: string;
    location: string;
    completed?: boolean;
  }[];
}

