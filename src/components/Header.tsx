import React from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
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
      <header className="lg:hidden sticky top-0 z-30 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-zinc-800/60 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="w-9 h-9 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-2">
            <BrandLogo size={32} showDot={false} />
            <span className="text-[12px] font-bold tracking-widest text-zinc-100">
              PIEDPOD // STORE
            </span>
          </div>
        </div>

        <button
          onClick={onOpenCart}
          aria-label="View bag"
          className="w-9 h-9 rounded-full bg-white text-black grid place-items-center relative shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-105 transition"
        >
          <ShoppingCart className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF00B7] text-white text-[10px] font-bold rounded-full grid place-items-center shadow-[0_0_8px_#FF00B7]">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0F] border-b border-zinc-800 px-4 py-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-[#0A0A0A] rounded-[14px] border border-zinc-800/80 grid place-items-center">
              <BrandLogo size={44} showDot={false} />
            </div>
            <div>
              <div className="text-[12px] font-bold text-white">PIEDPOD CYBER THRIFT</div>
              <div className="text-[10px] text-zinc-500">CURATED DROPS. NEON APPROVED.</div>
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
              DISCOVER
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('tracking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
            >
              TRACKING.exe
            </button>
          </div>
        </div>
      )}
    </>
  );
};
