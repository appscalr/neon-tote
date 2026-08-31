import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SidebarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPreferences: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] bg-[#0F0F0F] border-r border-zinc-800/80 flex-col z-40">
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <div className="relative flex flex-col items-center justify-center py-3">
          <BrandLogo size={96} showDot={false} />
          <div className="mt-3 text-[11px] tracking-[0.18em] text-zinc-300 font-bold uppercase text-center">
            The PiedPod Store
          </div>
          <div className="absolute top-2 right-3 w-2.5 h-2.5 bg-[#00FFCC] rounded-full shadow-[0_0_12px_#00FFCC] animate-pulse" />
        </div>

        {/* Navigation links */}
        <nav className="mt-8 space-y-1.5">
          <button
            onClick={() => scrollTo('grid')}
            className="w-full text-left px-3.5 py-2.5 rounded-full bg-white text-black text-[12px] font-bold flex items-center justify-between shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-zinc-100 transition"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              DISCOVER
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo('tracking')}
            className="w-full text-left px-3.5 py-2.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 text-[12px] tracking-widest flex items-center gap-2 transition"
          >
            <span className="w-4 h-4 rounded bg-zinc-800 grid place-items-center text-[10px] text-zinc-400">
              ≡
            </span>
            ORDER TRACKING
          </button>

          <button
            onClick={onOpenCart}
            className="w-full text-left px-3.5 py-2.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 text-[12px] tracking-widest flex items-center justify-between transition"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded bg-zinc-800 grid place-items-center text-[10px] text-zinc-400">
                ◧
              </span>
              <span>CHECK OUT</span>
            </div>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF00B7] text-white text-[10px] font-bold shadow-[0_0_10px_#FF00B7]">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-6 border-t border-zinc-800/60">
        <div className="text-[10px] leading-[1.5] text-zinc-500">
          <div className="text-zinc-300 font-bold mb-1">PIEDPOD SHOP</div>
          <div>Suite 15 Cumberland Bldg</div>
          <div>Cnr 8th &amp; E, Byo</div>
          <div className="mt-1">
            <a href="mailto:shop@piedpod.online" className="text-[#00FFCC] hover:underline cursor-pointer">
              shop@piedpod.online
            </a>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="px-2 py-1 rounded-full bg-[#161616] border border-zinc-800 text-[9px]">
              EST 2024
            </span>
            <span className="px-2 py-1 rounded-full bg-[#D6FF00] text-black text-[9px] font-bold shadow-[0_0_8px_#D6FF00]">
              OPEN
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
