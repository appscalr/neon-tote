import React from 'react';
import { X, Plus, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { getCategoryIcon } from '../utils/categoryIcons';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;
  const CategoryIcon = getCategoryIcon(product.category);

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in"
      />

      <div className="relative bg-[#141417] border border-zinc-800 rounded-[24px] max-w-[540px] w-full overflow-hidden shadow-[0_0_60px_rgba(0,255,204,0.15)] flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 bg-[#0F0F12]">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0C] border border-zinc-800 text-[11px] text-[#00FFCC] font-semibold">
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{product.category}</span>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              DROP #{product.id}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="w-8 h-8 rounded-full bg-[#18181F] border border-zinc-800 grid place-items-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[75vh] space-y-5">
          {/* Image */}
          <div className="aspect-[4/3] w-full rounded-[18px] bg-[#0A0A0C] border border-zinc-800 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-[#D6FF00] text-black text-xs font-bold shadow-[0_0_12px_rgba(214,255,0,0.3)]">
              <Star className="w-3.5 h-3.5 fill-black text-black" />
              <span>{product.rating.toFixed(1)}</span>
            </div>

            {product.condition && (
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur border border-white/10 text-xs font-medium text-zinc-200">
                {product.condition}
              </div>
            )}
          </div>

          {/* Typography Scale: Title & Description */}
          <div>
            <h3 className="text-[20px] font-bold text-white leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              {product.description || 'Curated cyberpunk aesthetic drop. Tested, sanitized, and authenticated by the PIEDPOD team.'}
            </p>
          </div>

          {/* Specifications */}
          {product.specs && (
            <div className="p-4 rounded-[16px] bg-[#0A0A0C] border border-zinc-800/80 space-y-2">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Tactile Specifications
              </div>
              <ul className="space-y-1.5 pt-1">
                {product.specs.map((spec, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full bg-[#16161B] border border-zinc-800 text-[11px] text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-[#00FFCC] bg-[#00FFCC]/10 border border-[#00FFCC]/20 rounded-[14px] p-3">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Tested &amp; UV-Sanitized • 14-Day Store Guarantee</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#0F0F12] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Price</span>
            <div className="text-[22px] font-mono font-bold text-[#00FFCC]">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-[#00FFCC] transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> ADD TO BAG
          </button>
        </div>
      </div>
    </div>
  );
};
