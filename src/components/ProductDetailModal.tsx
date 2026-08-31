import React from 'react';
import { X, Plus, Star, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { BrandLogo } from './BrandLogo';

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

  return (
    <div className="fixed inset-0 z-[75] grid place-items-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in"
      />

      <div className="relative bg-[#161616] border border-zinc-800 rounded-[28px] max-w-[560px] w-full overflow-hidden shadow-[0_0_80px_rgba(0,255,204,0.15)] flex flex-col">
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-zinc-800 bg-[#0F0F0F]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#0A0A0A] border border-zinc-800 text-[10px] tracking-widest text-[#00FFCC] font-bold">
              {product.category}
            </span>
            <span className="text-[11px] text-zinc-500 font-mono">
              SPEC_SHEET // 00{product.id}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close details"
            className="w-8 h-8 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-auto max-h-[75vh] space-y-5">
          <div className="aspect-video w-full rounded-[18px] bg-[#0A0A0A] border border-zinc-800 overflow-hidden relative">
            <img
              src={product.image}
              alt={product.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#D6FF00] text-black text-[11px] font-bold shadow-[0_0_12px_#D6FF00]">
              ★ {product.rating} RATING
            </div>
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur border border-white/10 text-[10px] text-zinc-300">
              {product.condition || 'Thrift-Graded'}
            </div>
          </div>

          <div>
            <h3 className="text-[20px] font-black text-white leading-tight">
              {product.name}
            </h3>
            <p className="text-[12px] text-zinc-400 mt-2 leading-5">
              {product.description || 'Curated cyberpunk aesthetic drop. Tested, cleaned, and authenticated by the PIEDPOD team.'}
            </p>
          </div>

          {/* Specifications */}
          {product.specs && (
            <div className="p-4 rounded-[16px] bg-[#0A0A0A] border border-zinc-800/80 space-y-2">
              <div className="text-[10px] tracking-widest text-zinc-500 font-bold">
                TACTILE SPECIFICATIONS
              </div>
              <ul className="space-y-1.5">
                {product.specs.map((spec, i) => (
                  <li key={i} className="text-[11px] text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]" />
                    {spec}
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
                className="px-2.5 py-1 rounded-full bg-[#161616] border border-zinc-800 text-[10px] text-zinc-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-zinc-800 bg-[#0F0F0F] flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest text-zinc-500">PRICE</span>
            <div className="text-[22px] font-black text-[#00FFCC]">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="px-6 py-3 rounded-full bg-white text-black font-bold text-[12px] tracking-widest flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-zinc-100 transition"
          >
            ADD TO BAG <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
