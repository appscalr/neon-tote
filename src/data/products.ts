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
    name: 'Minimal Square Watch',
    price: 12.45,
    rating: 4.4,
    category: 'WATCH',
    tags: ['ACCESSORIES', 'WATCH'],
    image: 'https://images.unsplash.com/photo-1524805444973-bf35c6d2a56a?w=600&auto=format&fit=crop&q=80',
    condition: 'Grade A+ Mint',
    specs: ['Matte Black PVD', 'Japanese Quartz', '5ATM Water Resistance'],
    description: 'Ultra-thin geometric profile with tactile silicone strap.'
  },
  {
    id: '2',
    name: 'Urban Sling Bag',
    price: 18.90,
    rating: 4.7,
    category: 'BAG',
    tags: ['BAG', 'SLING'],
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    condition: 'Thrift Grade A',
    specs: ['Cordura 500D', 'Fidlock Magnetic Buckle', 'Weatherproof Zips'],
    description: 'Compact EDC crossbody sling with quick-release harness.'
  },
  {
    id: '3',
    name: 'Magnetic Desk Light',
    price: 15.20,
    rating: 4.8,
    category: 'LIGHT',
    tags: ['DESKTOP', 'LIGHT', 'ACCESSORIES'],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    condition: 'Tested Refurbished',
    specs: ['3000K-6000K Dimming', 'Type-C Rechargeable', 'Magnetic Mount Base'],
    description: 'Rotatable tubular task bar with soft touch dimming.'
  },
  {
    id: '4',
    name: 'Noise Cancel Earbuds',
    price: 22.30,
    rating: 4.5,
    category: 'AUDIO',
    tags: ['AUDIO', 'EARBUDS'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    condition: 'Sanitized & Serviced',
    specs: ['-35dB Hybrid ANC', 'Bluetooth 5.3 Low Latency', '28hr Case Battery'],
    description: 'Cyber concrete casing with crisp studio sound profile.'
  },
  {
    id: '5',
    name: 'Mech Low Keyboard',
    price: 45.00,
    rating: 4.9,
    category: 'KEYBOARD',
    tags: ['DESKTOP', 'KEYBOARD'],
    image: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=600&auto=format&fit=crop&q=80',
    condition: 'Grade A Studio Demo',
    specs: ['Low Profile Gateron Red', 'CNC Aluminium Chassis', 'RGB Cyber Matrix'],
    description: '65% wireless layout with satisfying linear key travel.'
  },
  {
    id: '6',
    name: 'Stealth Phone Case',
    price: 14.50,
    rating: 4.6,
    category: 'PHONE',
    tags: ['SMARTPHONE', 'PHONE', 'ACCESSORIES'],
    image: 'https://images.unsplash.com/photo-1592899677977-9bb10ba128a5?w=600&auto=format&fit=crop&q=80',
    condition: 'Brand New In Box',
    specs: ['Aramid Fiber Weave', 'MagSafe Compatible', 'Drop Rated 2.4m'],
    description: 'Ultralight matte texture with chamfered camera ring.'
  },
  {
    id: '7',
    name: 'Heavy Hoodie',
    price: 32.00,
    rating: 4.8,
    category: 'WEAR',
    tags: ['WEAR', 'HOODIE'],
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80',
    condition: 'Thrift Grade A',
    specs: ['480GSM French Terry', 'Double-lined Hood', 'Hidden Media Pocket'],
    description: 'Oversized boxy drop shoulder silhouette in carbon wash.'
  },
  {
    id: '8',
    name: 'Mono Water Bottle',
    price: 16.75,
    rating: 4.7,
    category: 'BOTTLE',
    tags: ['ACCESSORIES', 'BOTTLE'],
    image: 'https://images.unsplash.com/photo-1523369364227-24952d7f2d05?w=600&auto=format&fit=crop&q=80',
    condition: 'Sealed New',
    specs: ['18/8 Double Wall Steel', 'Powder Coated Grip', '750ml Volume'],
    description: 'Keeps liquids iced 24h or hot 12h without condensation.'
  },
  {
    id: '9',
    name: 'Concrete Speaker',
    price: 28.90,
    rating: 4.6,
    category: 'SPEAKER',
    tags: ['DESKTOP', 'AUDIO', 'SPEAKER'],
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    condition: 'Refurbished A+',
    specs: ['Cast Concrete Shell', 'Passive Bass Radiator', 'IPX5 Weather Proof'],
    description: 'Acoustic dampening solid cast enclosure with punchy punch.'
  },
  {
    id: '10',
    name: 'Cargo Tech Pants',
    price: 38.50,
    rating: 4.7,
    category: 'PANTS',
    tags: ['WEAR', 'PANTS'],
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80',
    condition: 'Grade A Deadstock',
    specs: ['Ripstop Stretch Nylon', '8 Modular Pockets', 'Ankle Cinch Drawcords'],
    description: 'Technical water-repellent pants for urban mobility.'
  },
  {
    id: '11',
    name: 'Grid Desk Mat',
    price: 19.20,
    rating: 4.5,
    category: 'DESKTOP',
    tags: ['LAPTOP', 'DESKTOP', 'MAT'],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80',
    condition: 'Brand New',
    specs: ['900x400x4mm Stitched Edge', 'High-Density Micro-Weave', 'Anti-Slip Rubber'],
    description: 'Tactile isometric grid pad with hydrophobic coating.'
  },
  {
    id: '12',
    name: 'Modular Backpack',
    price: 42.00,
    rating: 4.9,
    category: 'BACKPACK',
    tags: ['BAG', 'BACKPACK'],
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
    condition: 'Grade A+ Studio',
    specs: ['X-Pac Waterproof Fabric', '16\" Laptop Suspended Bay', 'MOLLE Attachment Grid'],
    description: 'Expandable 22L-28L roll-top daypack with ergonomic back harness.'
  }
];

export const HERO_BG = 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80';

export const SPOTLIGHT_ITEMS: Product[] = [PRODUCTS[2], PRODUCTS[0], PRODUCTS[1]];
