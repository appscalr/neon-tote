import React from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  cartCount,
  onOpenCart,
}) => {
  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-full bg-[#16161B] border border-zinc-800 grid place-items-center text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-2">
            <BrandLogo size={28} showDot={false} />
            <span className="text-[13px] font-bold tracking-wider text-white">
              PIEDPOD STORE
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          aria-label="View bag"
          className="w-9 h-9 rounded-full bg-white text-black grid place-items-center relative shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 transition"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF00B7] text-white text-[9px] font-bold rounded-full grid place-items-center font-mono">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F12] border-b border-zinc-800 px-4 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0A0A0C] rounded-[12px] border border-zinc-800 grid place-items-center">
              <BrandLogo size={36} showDot={false} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">PIEDPOD TECH THRIFT</div>
              <div className="text-[11px] text-zinc-400">Curated drops • Tactile haptics</div>
            </div>
          </div>
          
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold"
            >
              Browse Drops
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full bg-[#181820] border border-zinc-800 text-xs text-zinc-300"
            >
              Order Tracking
            </button>
          </div>
        </div>
      )}
    </>
  );
};
