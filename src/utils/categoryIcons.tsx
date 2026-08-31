import React from 'react';
import {
  ShoppingBag,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  Sliders,
  Shirt,
  Monitor,
  Keyboard,
  SunMedium,
  Volume2,
  Layers,
  LucideIcon,
} from 'lucide-react';

export function getCategoryIcon(category: string): LucideIcon {
  const cat = category.toUpperCase();
  if (cat.includes('BAG') || cat.includes('SLING') || cat.includes('PACK')) return ShoppingBag;
  if (cat.includes('AUDIO') || cat.includes('EARBUD') || cat.includes('HEADPHONE')) return Headphones;
  if (cat.includes('WATCH')) return Watch;
  if (cat.includes('KEYBOARD')) return Keyboard;
  if (cat.includes('LIGHT') || cat.includes('LAMP')) return SunMedium;
  if (cat.includes('PHONE') || cat.includes('SMARTPHONE')) return Smartphone;
  if (cat.includes('WEAR') || cat.includes('HOODIE') || cat.includes('PANTS') || cat.includes('SHIRT')) return Shirt;
  if (cat.includes('SPEAKER')) return Volume2;
  if (cat.includes('LAPTOP') || cat.includes('DESKTOP') || cat.includes('MONITOR')) return Laptop;
  if (cat.includes('BOTTLE') || cat.includes('ACCESSORIES')) return Sliders;
  return Layers;
}
