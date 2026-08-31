import { CartItem, TrackingLog } from '../types';

export interface StoredOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerEmail?: string;
  customerPhone?: string;
  paymentMethod?: string;
  status: 'Processing' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  estimatedDays: string;
  hubLocation: string;
  createdAt: number;
  events: {
    time: string;
    description: string;
    location: string;
    completed: boolean;
  }[];
}

const STORAGE_KEY = 'piedpod_order_history_v1';

export const MOCK_SEED_ORDERS: StoredOrder[] = [
  {
    orderNumber: 'URBN-4829-1092-7733',
    date: 'Aug 30, 2026',
    items: [
      {
        product: {
          id: 'p-1',
          name: 'Cyberpunk OLED Messenger Tote',
          price: 68.0,
          rating: 4.9,
          category: 'BAG',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
          tags: ['BAG', 'TACTILE'],
        },
        qty: 1,
      },
      {
        product: {
          id: 'p-4',
          name: 'Clear Shell Mechanical Earphones',
          price: 34.0,
          rating: 4.8,
          category: 'AUDIO',
          image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
          tags: ['AUDIO', 'CYBER'],
        },
        qty: 1,
      },
    ],
    subtotal: 102.0,
    shippingFee: 0,
    total: 102.0,
    customerEmail: 'collector@piedpod.online',
    customerPhone: '+263 77 123 4567',
    paymentMethod: 'Apple Pay / Instant Checkout',
    status: 'In Transit',
    estimatedDays: '1-2 Business Days',
    hubLocation: 'Cumberland Bldg Hub // Sector 8',
    createdAt: Date.now() - 1000 * 60 * 60 * 18,
    events: [
      {
        time: '10:42 AM • Today',
        description: 'Package sorted & scanned for local dispatch route',
        location: 'Cnr 8th & E Ave, Bulawayo',
        completed: true,
      },
      {
        time: '04:15 PM • Yesterday',
        description: 'Dispatched from PIEDPOD Vault with shock-proof seal',
        location: 'Suite 15 Cumberland Fulfillment',
        completed: true,
      },
      {
        time: '02:00 PM • Yesterday',
        description: 'Quality Thrift Grade Verified & Sanitized with UV chamber',
        location: 'URBN Studio Lab',
        completed: true,
      },
      {
        time: '01:30 PM • Yesterday',
        description: 'Payment authorized & shockpack allocated',
        location: 'PIEDPOD Secure Payment Gateway',
        completed: true,
      },
    ],
  },
  {
    orderNumber: 'URBN-9102-4418-2091',
    date: 'Aug 28, 2026',
    items: [
      {
        product: {
          id: 'p-3',
          name: 'Transparent Tactical Pocket Radio & Amp',
          price: 49.0,
          rating: 4.9,
          category: 'AUDIO',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          tags: ['AUDIO', 'VINTAGE'],
        },
        qty: 1,
      },
    ],
    subtotal: 49.0,
    shippingFee: 4.5,
    total: 53.5,
    customerEmail: 'alex.cyber@gmail.com',
    customerPhone: '+263 71 998 1234',
    paymentMethod: 'PayNow Direct',
    status: 'Delivered',
    estimatedDays: 'Delivered Successfully',
    hubLocation: 'Bulawayo Central Drop Point',
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
    events: [
      {
        time: '11:20 AM • Aug 29',
        description: 'Delivered and signed by recipient at delivery point',
        location: 'Recipient Address, Bulawayo',
        completed: true,
      },
      {
        time: '08:45 AM • Aug 29',
        description: 'Out for final delivery via Courier Courier Rider',
        location: 'Bulawayo Metro Route 4',
        completed: true,
      },
      {
        time: '04:00 PM • Aug 28',
        description: 'Arrived at Central Hub and sorted',
        location: 'Cumberland Bldg Fulfillment',
        completed: true,
      },
      {
        time: '11:00 AM • Aug 28',
        description: 'Order confirmed & packaged',
        location: 'PIEDPOD Vault',
        completed: true,
      },
    ],
  },
];

export function getStoredOrders(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_SEED_ORDERS));
      return MOCK_SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : MOCK_SEED_ORDERS;
  } catch (e) {
    return MOCK_SEED_ORDERS;
  }
}

export function saveOrderToStorage(order: StoredOrder): void {
  try {
    const current = getStoredOrders();
    const filtered = current.filter((o) => o.orderNumber !== order.orderNumber);
    const updated = [order, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

export function findOrderByNumber(queryId: string): StoredOrder | null {
  const cleanQuery = queryId.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
  if (!cleanQuery) return null;

  const orders = getStoredOrders();
  
  // Exact match
  const exact = orders.find(
    (o) => o.orderNumber.toUpperCase() === cleanQuery || o.orderNumber.replace(/[^A-Z0-9]/g, '') === cleanQuery.replace(/[^A-Z0-9]/g, '')
  );
  if (exact) return exact;

  // Partial match
  const partial = orders.find((o) => o.orderNumber.toUpperCase().includes(cleanQuery));
  if (partial) return partial;

  return null;
}

export function generateLiveTrackingFromId(orderId: string, email?: string): StoredOrder {
  const formattedId = orderId.toUpperCase().startsWith('URBN-') ? orderId.toUpperCase() : `URBN-${orderId.toUpperCase()}`;
  
  return {
    orderNumber: formattedId,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    items: [
      {
        product: {
          id: 'p-custom-drop',
          name: 'PIEDPOD Verified Drop Pack',
          price: 45.0,
          rating: 5.0,
          category: 'TECH_THRIFT',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
          tags: ['TACTICAL', 'NEON'],
        },
        qty: 1,
      },
    ],
    subtotal: 45.0,
    shippingFee: 0,
    total: 45.0,
    customerEmail: email || 'collector@piedpod.online',
    customerPhone: '+263 77 000 0000',
    paymentMethod: 'Verified 1-Tap Checkout',
    status: 'In Transit',
    estimatedDays: '1-2 Business Days',
    hubLocation: 'Cumberland Bldg Hub // Sector 8',
    createdAt: Date.now(),
    events: [
      {
        time: 'Just now',
        description: 'Active tracking scan verified in Cumberland Network',
        location: 'Bulawayo Metro Sorting Hub',
        completed: true,
      },
      {
        time: '3 hours ago',
        description: 'Dispatched from PIEDPOD Vault with shock-proof packaging',
        location: 'Suite 15 Cumberland Fulfillment',
        completed: true,
      },
      {
        time: '5 hours ago',
        description: 'Quality Thrift Grade Verified & Sanitized',
        location: 'URBN Studio Lab',
        completed: true,
      },
      {
        time: 'Today',
        description: 'Order placed & security seal issued',
        location: 'PIEDPOD Direct Terminal',
        completed: true,
      },
    ],
  };
}
