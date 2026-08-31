import { CategoryType, Product } from '../types';

export const CATEGORIES: CategoryType[] = [
  'ALL',
  'DESKTOP',
  'LAPTOP',
  'SMARTPHONE',
  'AUDIO',
  'BAG',
  'ACCESSORIES',
  'WEAR',
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Minimal Geometric Watch',
    price: 12.45,
    rating: 4.8,
    category: 'WATCH',
    tags: ['ACCESSORIES', 'WATCH'],
    image: 'https://images.unsplash.com/photo-1524805444973-bf35c6d2a56a?w=700&auto=format&fit=crop&q=80',
    condition: 'Mint Condition',
    specs: ['Matte Black PVD Finish', 'Japanese Quartz Movement', '5ATM Water Resistance'],
    description: 'Ultra-thin geometric profile with soft-touch tactile silicone strap.'
  },
  {
    id: '2',
    name: 'Urban Technical Sling Bag',
    price: 18.90,
    rating: 4.9,
    category: 'BAG',
    tags: ['BAG', 'SLING'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    condition: 'Grade A Refurbished',
    specs: ['Cordura 500D Ballistic Nylon', 'Fidlock Magnetic Buckle', 'Weatherproof Zips'],
    description: 'Compact EDC crossbody sling with quick-release magnetic harness.'
  },
  {
    id: '3',
    name: 'Magnetic Ambient Desk Light',
    price: 15.20,
    rating: 4.8,
    category: 'LIGHT',
    tags: ['DESKTOP', 'LIGHT', 'ACCESSORIES'],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&auto=format&fit=crop&q=80',
    condition: 'Tested Refurbished',
    specs: ['3000K-6000K Warm Dimming', 'USB-C Rechargeable', 'Magnetic Swivel Base'],
    description: 'Rotatable tubular task bar with soft touch dimming and warm ambient hue.'
  },
  {
    id: '4',
    name: 'Transparent Audio Earbuds',
    price: 22.30,
    rating: 4.7,
    category: 'AUDIO',
    tags: ['AUDIO', 'EARBUDS'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80',
    condition: 'Sanitized & Serviced',
    specs: ['-35dB Hybrid Active Noise Cancelling', 'Bluetooth 5.3 Low Latency', '28hr Case Battery'],
    description: 'Clear mechanical shell casing with balanced, punchy studio acoustics.'
  },
  {
    id: '5',
    name: 'Low Profile Mechanical Keyboard',
    price: 45.00,
    rating: 4.9,
    category: 'KEYBOARD',
    tags: ['DESKTOP', 'KEYBOARD'],
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
    condition: 'Studio Demo Mint',
    specs: ['Low Profile Gateron Red Switches', 'CNC Aluminium Bezel', 'Subtle Backlit Matrix'],
    description: '65% wireless layout with satisfying linear key travel and dampening foam.'
  },
  {
    id: '6',
    name: 'Aramid Fiber Stealth Case',
    price: 14.50,
    rating: 4.6,
    category: 'PHONE',
    tags: ['SMARTPHONE', 'PHONE', 'ACCESSORIES'],
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=700&auto=format&fit=crop&q=80',
    condition: 'Brand New In Box',
    specs: ['Aramid Fiber Weave', 'MagSafe Compatible Ring', 'Drop Tested 2.4m'],
    description: 'Ultralight matte texture with chamfered lens protection.'
  },
  {
    id: '7',
    name: 'Heavy French Terry Hoodie',
    price: 32.00,
    rating: 4.8,
    category: 'WEAR',
    tags: ['WEAR', 'HOODIE'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=700&auto=format&fit=crop&q=80',
    condition: 'Grade A Deadstock',
    specs: ['480GSM Heavy French Terry', 'Double-lined Hood', 'Hidden Media Pocket'],
    description: 'Oversized drop shoulder silhouette with soft brushed interior.'
  },
  {
    id: '8',
    name: 'Insulated Thermal Bottle',
    price: 16.75,
    rating: 4.7,
    category: 'BOTTLE',
    tags: ['ACCESSORIES', 'BOTTLE'],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80',
    condition: 'Sealed New',
    specs: ['18/8 Double Wall Stainless Steel', 'Powder Coated Matte Finish', '750ml Volume'],
    description: 'Keeps beverages chilled for 24 hours with condensation-free grip.'
  },
  {
    id: '9',
    name: 'Tactile Enclosure Speaker',
    price: 28.90,
    rating: 4.7,
    category: 'SPEAKER',
    tags: ['DESKTOP', 'AUDIO', 'SPEAKER'],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&auto=format&fit=crop&q=80',
    condition: 'Refurbished A+',
    specs: ['Damped Acoustic Enclosure', 'Passive Bass Radiator', 'IPX5 Water Resistant'],
    description: 'Rich room-filling sound with tactile rotary volume dial.'
  },
  {
    id: '10',
    name: 'Technical Stretch Cargo Pants',
    price: 38.50,
    rating: 4.8,
    category: 'PANTS',
    tags: ['WEAR', 'PANTS'],
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=700&auto=format&fit=crop&q=80',
    condition: 'Grade A Deadstock',
    specs: ['Ripstop Stretch Nylon', '8 Low-Profile Pockets', 'Ankle Cinch Drawcords'],
    description: 'Water-repellent technical trousers designed for daily urban mobility.'
  },
  {
    id: '11',
    name: 'Tactile Felt Desk Mat',
    price: 19.20,
    rating: 4.6,
    category: 'DESKTOP',
    tags: ['LAPTOP', 'DESKTOP', 'MAT'],
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=700&auto=format&fit=crop&q=80',
    condition: 'Brand New',
    specs: ['900x400x4mm Wool Felt', 'Precision Stitched Edges', 'Non-Slip Cork Base'],
    description: 'Warm, soft natural felt workspace mat that softens key clatter.'
  },
  {
    id: '12',
    name: 'Modular Roll-Top Backpack',
    price: 42.00,
    rating: 4.9,
    category: 'BACKPACK',
    tags: ['BAG', 'BACKPACK'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80',
    condition: 'Mint Studio Demo',
    specs: ['Weatherproof X-Pac Fabric', '16\" Suspended Laptop Sleeve', 'Modular Front Straps'],
    description: 'Expandable 22L-28L roll-top daypack with breathable ergonomic harness.'
  }
];

export const HERO_BG = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80';

export const SPOTLIGHT_ITEMS: Product[] = [PRODUCTS[1], PRODUCTS[3], PRODUCTS[2]];
