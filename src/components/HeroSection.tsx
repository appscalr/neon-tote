import React from 'react';
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { HERO_BG } from '../data/products';

interface HeroSectionProps {
  spotlightItems: Product[];
  currentSpotlightIndex: number;
  onShuffle: () => void;
  onSelectSpotlightIndex: (idx: number) => void;
  onAddToCart: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  spotlightItems,
  currentSpotlightIndex,
  onShuffle,
  onSelectSpotlightIndex,
  onAddToCart,
}) => {
  const currentItem = spotlightItems[currentSpotlightIndex] || spotlightItems[0];

  return (
    <section className="px-4 lg:px-8 pt-6 lg:pt-10 pb-6">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-4 lg:gap-6">
        {/* Left Hero Card */}
        <div className="relative rounded-[28px] bg-[#161616] border border-zinc-800/80 overflow-hidden p-6 lg:p-10 min-h-[420px] lg:min-h-[520px] flex flex-col justify-between">
          {/* Ambient Glows */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-[300px] h-[300px] rounded-full bg-[#00FFCC]/15 blur-[50px]" />
            <div className="absolute -bottom-24 -right-24 w-[380px] h-[380px] rounded-full bg-[#FF00B7]/15 blur-[60px]" />
          </div>

          <div className="relative z-10">
            <h1 className="display text-[42px] lg:text-[64px] leading-[0.9] font-black tracking-[-0.04em]">
              <span>PIEDPOD</span> <span className="text-zinc-500">/</span> <span>CERTIFIED</span>
              <br />
              <span className="text-[#00FFCC] drop-shadow-[0_0_14px_rgba(0,255,204,0.7)]">NEON</span>{' '}
              <span className="text-zinc-500">/</span>
              <br />
              <span className="text-[#FF00B7]">DROPS.</span>
            </h1>

            <p className="mt-5 max-w-[36ch] text-[13px] leading-6 text-zinc-400">
              Tactile tech thrift. Heavy concrete renders, soft haptics. We flip gadgets + accessories — minimal, bag, audio, workspace.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-white text-black text-[12px] font-bold tracking-widest hover:bg-zinc-100 transition flex items-center gap-2 shadow-[0_0_24px_rgba(255,255,255,0.2)]"
              >
                EXPLORE NOW <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onShuffle}
                className="px-5 py-3 rounded-full bg-[#0A0A0A] border border-zinc-700 text-[12px] text-zinc-300 hover:border-zinc-500 hover:text-white transition"
              >
                Shuffle ↻
              </button>
            </div>

            {/* Quick Spotlight Preview Banner */}
            <div className="mt-10 rounded-[18px] bg-[#0A0A0A] border border-zinc-800 p-4 flex items-center gap-4 max-w-[420px]">
              <div className="w-14 h-14 rounded-[12px] overflow-hidden bg-[#111] border border-zinc-700 shrink-0">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[11px] tracking-widest text-zinc-500">{currentItem.category}</div>
                <div className="text-[13px] font-bold truncate text-white">{currentItem.name}</div>
                <div className="text-[#00FFCC] text-[13px] font-bold">
                  ${currentItem.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => onAddToCart(currentItem)}
                className="w-10 h-10 rounded-full bg-[#D6FF00] text-black grid place-items-center hover:scale-105 transition shadow-[0_0_12px_rgba(214,255,0,0.4)]"
                aria-label="Add spotlight item"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Deal Bar Status */}
          <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/60">
            <div className="flex items-center justify-between text-[10px] tracking-widest text-zinc-500 mb-2 font-semibold">
              <span>DEAL {currentSpotlightIndex + 1}/{spotlightItems.length}</span>
              <span className="text-zinc-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D6FF00]" /> LIMITED FLIP
              </span>
            </div>

            <div className="h-[6px] rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FFCC] to-[#FF00B7] shadow-[0_0_10px_#00FFCC] transition-all duration-500"
                style={{
                  width: `${((currentSpotlightIndex + 1) / spotlightItems.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-3 flex gap-1.5">
              {spotlightItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectSpotlightIndex(idx)}
                  aria-label={`Select spotlight item ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSpotlightIndex ? 'w-8 bg-white' : 'w-4 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Showcase Card */}
        <div className="relative rounded-[28px] bg-[#121212] border border-zinc-800/80 overflow-hidden min-h-[420px] lg:min-h-[520px] group">
          <img
            src={HERO_BG}
            alt="Laptop desktop setup"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 via-[#0A0A0A]/30 to-[#0A0A0A]/95" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFCC]/15 to-[#FF00B7]/15 mix-blend-overlay" />

          {/* Badges */}
          <div className="absolute top-5 left-5 z-10 flex gap-2 flex-wrap">
            <span className="px-3 py-1.5 rounded-full bg-[#00FFCC] text-black text-[10px] font-bold tracking-widest shadow-[0_0_12px_#00FFCC]">
              FEATURED
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#0A0A0A]/80 backdrop-blur border border-zinc-700 text-zinc-300 text-[10px] tracking-widest">
              {currentItem.category} // 00{currentItem.id}
            </span>
          </div>

          <div className="absolute top-5 right-5 z-10">
            <div className="px-3 py-2 rounded-full bg-[#D6FF00] text-black text-[11px] font-bold rotate-3 shadow-[0_0_18px_#D6FF00]">
              ★ {currentItem.rating} NEON RATED
            </div>
          </div>

          {/* Ambient center pulse */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <div className="w-[200px] h-[200px] rounded-full bg-[#00FFCC]/10 blur-[40px] animate-pulse" />
          </div>

          {/* Bottom metadata banner */}
          <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-[12px] overflow-hidden border border-white/20 hidden lg:block">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="text-[18px] lg:text-[20px] font-bold leading-tight text-white">
                  {currentItem.name}
                </div>
                <div className="text-zinc-300 text-[11px] mt-1 tracking-widest">
                  REAL GEAR • THRIFT-GRADED • {currentItem.tags[0]}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[22px] font-black text-[#00FFCC]">
                ${currentItem.price.toFixed(2)}
              </div>
              <button
                onClick={() => onAddToCart(currentItem)}
                className="mt-2 px-4 py-2 rounded-full bg-white text-black text-[11px] font-bold tracking-widest flex items-center gap-1 hover:bg-zinc-100 transition shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                ADD <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
