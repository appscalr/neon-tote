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

export interface TrackingLog {
  trackingId: string;
  status: 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Processing';
  estimatedDays: string;
  hubLocation: string;
  events: {
    time: string;
    description: string;
    location: string;
  }[];
}
