import React, { useRef } from 'react';
import { Plus, Check, Star } from 'lucide-react';
import { Product } from '../types';
import { getCategoryIcon } from '../utils/categoryIcons';

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
  const CategoryIcon = getCategoryIcon(product.category);

  const handlePointerDown = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      onAddToCart(product);
    }, 500);
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
      className="group relative rounded-[20px] bg-[#141416] border border-zinc-800/80 hover:border-[#00FFCC]/50 p-3 lg:p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(0,255,204,0.12)] select-none touch-manipulation cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Clean category badge with icon + subtle star rating */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0A0C] border border-zinc-800 text-[10px] font-medium text-zinc-300 group-hover:text-[#00FFCC] group-hover:border-[#00FFCC]/30 transition-colors">
            <CategoryIcon className="w-3 h-3 text-[#00FFCC]" />
            <span className="tracking-wide uppercase text-[9px] font-semibold">{product.category}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
            <Star className="w-3 h-3 text-[#D6FF00] fill-[#D6FF00]" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Image Container with Warm Glow & Clean Subtle Badge */}
        <div className="aspect-square rounded-[14px] bg-[#0A0A0C] border border-zinc-800/70 overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Clean condition tag */}
          {product.condition && (
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[9px] font-medium text-zinc-300">
              {product.condition}
            </div>
          )}
        </div>

        {/* Typographic Hierarchy: Product Name */}
        <div className="mt-3">
          <h3 className="text-[13px] font-semibold leading-snug line-clamp-2 min-h-[36px] text-zinc-100 group-hover:text-white transition-colors">
            {product.name}
          </h3>
        </div>
      </div>

      {/* Footer: Price & Clean Add Action */}
      <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-zinc-500 block leading-none mb-0.5">PRICE</span>
          <span className="text-[#00FFCC] font-mono font-bold text-[15px]">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          aria-label={`Add ${product.name} to bag`}
          className={`w-8 h-8 rounded-full grid place-items-center transition-all ${
            isAdded
              ? 'bg-[#00FFCC] text-black scale-105 shadow-[0_0_15px_#00FFCC]'
              : 'bg-zinc-100 text-black hover:bg-[#00FFCC] hover:shadow-[0_0_14px_rgba(0,255,204,0.4)]'
          }`}
        >
          {isAdded ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4" />}
        </button>
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
    <section id="grid" className="px-4 lg:px-8 py-4">
      {products.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-zinc-800 rounded-[20px] bg-[#121214]/50">
          <p className="text-zinc-400 text-sm max-w-[40ch] mx-auto">
            No drops found under ${maxBudget} in this category. Expand your budget or switch vibes.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 px-5 py-2 rounded-full bg-[#00FFCC] text-black text-xs font-bold shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:brightness-110 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
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
