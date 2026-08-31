import React from 'react';
import { ArrowUpRight, ShoppingBag, Truck, Sparkles } from 'lucide-react';
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
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[240px] bg-[#0F0F12] border-r border-zinc-800/80 flex-col z-40">
      {/* Brand Header */}
      <div className="p-6 pb-4">
        <div className="relative flex flex-col items-center justify-center py-2">
          <BrandLogo size={88} showDot={false} />
          <div className="mt-3 text-[12px] tracking-[0.15em] text-white font-bold uppercase text-center">
            The PiedPod Store
          </div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
            Tactile Tech Thrift
          </span>
        </div>

        {/* Navigation links */}
        <nav className="mt-8 space-y-1.5">
          <button
            onClick={() => scrollTo('grid')}
            className="w-full text-left px-3.5 py-2.5 rounded-full bg-white text-black text-[12px] font-bold flex items-center justify-between shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-[#00FFCC] transition cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalog Drops</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo('tracking')}
            className="w-full text-left px-3.5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#16161D] text-[12px] font-medium flex items-center gap-2.5 transition cursor-pointer"
          >
            <Truck className="w-4 h-4 text-[#00FFCC]" />
            <span>Order Tracking</span>
          </button>

          <button
            onClick={onOpenCart}
            className="w-full text-left px-3.5 py-2.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#16161D] text-[12px] font-medium flex items-center justify-between transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#FF00B7]" />
              <span>Your Bag</span>
            </div>
            {cartCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#FF00B7] text-white text-[10px] font-bold font-mono">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Footer Info */}
      <div className="mt-auto p-6 border-t border-zinc-800/60 text-xs">
        <div className="text-zinc-400 space-y-1">
          <div className="text-white font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC]" />
            <span>Cumberland Store</span>
          </div>
          <div className="text-zinc-500 text-[11px]">
            Suite 15 Cumberland Bldg
            <br />
            Cnr 8th &amp; E Ave, Bulawayo
          </div>
          <div className="pt-1">
            <a href="mailto:shop@piedpod.online" className="text-[#00FFCC] text-[11px] hover:underline">
              shop@piedpod.online
            </a>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-[#181820] border border-zinc-800 text-[10px] text-zinc-400">
            Est. 2024
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#D6FF00] text-black text-[10px] font-bold">
            Live
          </span>
        </div>
      </div>
    </aside>
  );
};
