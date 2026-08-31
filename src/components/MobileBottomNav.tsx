import React from 'react';
import { LayoutGrid, Search, ShoppingBag, ShoppingCart } from 'lucide-react';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart,
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Sticky Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#0F0F0F]/90 backdrop-blur-xl border-t border-zinc-800 px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => scrollTo('grid')}
          className="flex flex-col items-center gap-1 text-[10px] tracking-widest text-white font-medium"
        >
          <div className="w-8 h-8 rounded-full bg-white text-black grid place-items-center">
            <LayoutGrid className="w-4 h-4" />
          </div>
          DISCOVER
        </button>

        <button
          onClick={() => scrollTo('tracking')}
          className="flex flex-col items-center gap-1 text-[10px] tracking-widest text-zinc-400 hover:text-white transition"
        >
          <div className="w-8 h-8 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center">
            <Search className="w-4 h-4" />
          </div>
          TRACK
        </button>

        <button
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 text-[10px] tracking-widest text-zinc-400 hover:text-white transition relative"
        >
          <div className="w-8 h-8 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          BAG
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 w-4 h-4 bg-[#FF00B7] text-white rounded-full grid place-items-center text-[9px] font-bold shadow-[0_0_8px_#FF00B7]">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Floating Desktop Cart Action Trigger */}
      <button
        onClick={onOpenCart}
        aria-label="Open Shopping Bag"
        className="hidden lg:grid fixed bottom-6 right-6 w-14 h-14 rounded-full bg-white text-black place-items-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 transition z-40"
      >
        <ShoppingBag className="w-5 h-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#FF00B7] text-white text-[11px] font-bold rounded-full grid place-items-center shadow-[0_0_10px_#FF00B7]">
            {cartCount}
          </span>
        )}
      </button>
    </>
  );
};
