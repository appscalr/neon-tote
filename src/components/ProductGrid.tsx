import React, { useRef } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';

interface ProductCardProps {
  product: Product;
  isAdded: boolean;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdded,
  onAddToCart,
  onSelectProduct,
}) => {
  const timerRef = useRef<number | null>(null);

  const handlePointerDown = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onAddToCart(product);
    }, 550);
  };

  const handlePointerUp = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={() => onSelectProduct(product)}
      className="group relative rounded-[22px] bg-[#161616] border border-zinc-800 hover:border-[#00FFCC]/60 p-3 lg:p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,255,204,0.18)] select-none touch-manipulation cursor-pointer flex flex-col justify-between"
    >
      <div className="relative">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-[#0A0A0A] border border-zinc-800 text-[9px] tracking-widest text-[#00FFCC] shadow-[0_0_10px_rgba(0,255,204,0.15)] font-bold">
            {product.category}
          </span>
          <span className="text-[10px] text-zinc-400 flex items-center gap-1">
            <Star className="w-3 h-3 text-[#D6FF00] fill-[#D6FF00]" /> {product.rating}
          </span>
        </div>

        {/* Image Container */}
        <div className="mt-3 aspect-square rounded-[16px] bg-[#0F0F0F] border border-zinc-800/60 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          
          {/* Logo badge stamp */}
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#161616]/80 backdrop-blur border border-zinc-800/80 grid place-items-center overflow-hidden">
            <BrandLogo size={18} showDot={false} />
          </div>

          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur border border-white/10 text-[8px] tracking-widest text-zinc-300">
            {product.tags[0]}
          </div>
        </div>

        {/* Body content */}
        <div className="mt-3">
          <h3 className="text-[12px] lg:text-[13px] font-bold leading-tight line-clamp-2 min-h-[32px] text-white">
            {product.name}
          </h3>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-[#00FFCC] font-black text-[14px]">
              ${product.price.toFixed(2)}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              aria-label={`Add ${product.name} to bag`}
              className={`w-8 h-8 rounded-full grid place-items-center transition-all ${
                isAdded
                  ? 'bg-[#00FFCC] text-black scale-110 shadow-[0_0_18px_#00FFCC]'
                  : 'bg-white text-black hover:bg-zinc-100 hover:shadow-[0_0_14px_rgba(0,255,204,0.5)]'
              }`}
            >
              {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2.5 text-[9px] tracking-widest text-zinc-500 font-medium">
        HOLD TO QUICK-ADD
      </div>
    </div>
  );
};

interface ProductGridProps {
  products: Product[];
  activeAddId: string | null;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  maxBudget: number;
  onResetFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeAddId,
  onAddToCart,
  onSelectProduct,
  maxBudget,
  onResetFilters,
}) => {
  return (
    <section className="px-4 lg:px-8 py-4">
      {products.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-[20px] mt-2">
          <div className="text-zinc-400 text-sm max-w-[40ch] mx-auto">
            No drops under ${maxBudget} in this category. Expand your bag budget or switch vibes.
          </div>
          <button
            onClick={onResetFilters}
            className="mt-4 px-5 py-2.5 rounded-full bg-[#00FFCC] text-black text-xs font-bold shadow-[0_0_15px_rgba(0,255,204,0.4)]"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdded={activeAddId === product.id}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
};
