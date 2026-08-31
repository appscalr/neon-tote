import React from 'react';
import { ArrowUpRight, Plus, Sparkles, Star } from 'lucide-react';
import { Product } from '../types';
import { HERO_BG } from '../data/products';
import { getCategoryIcon } from '../utils/categoryIcons';

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
  const CategoryIcon = getCategoryIcon(currentItem.category);

  return (
    <section className="px-4 lg:px-8 pt-6 lg:pt-8 pb-6">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4 lg:gap-6">
        {/* Left Hero Card */}
        <div className="relative rounded-[26px] bg-[#141417] border border-zinc-800/90 overflow-hidden p-6 lg:p-9 min-h-[420px] lg:min-h-[480px] flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {/* Subtle Ambient Warm/Neon Glow */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[280px] h-[280px] rounded-full bg-[#00FFCC]/15 blur-[60px]" />
            <div className="absolute -bottom-20 -right-20 w-[320px] h-[320px] rounded-full bg-[#FF00B7]/12 blur-[70px]" />
          </div>

          <div className="relative z-10">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0C] border border-zinc-800 text-[10px] font-semibold text-zinc-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FFCC] animate-pulse" />
              <span>CURATED TECH THRIFT &amp; ACCS</span>
            </div>

            {/* Typographic Scale: Headline */}
            <h1 className="text-[36px] sm:text-[46px] lg:text-[54px] leading-[1.02] font-black tracking-[-0.03em] text-white">
              PIEDPOD <span className="text-[#00FFCC]">NEON</span>
              <br />
              TACTILE DROPS.
            </h1>

            {/* Narrative Copy: Soft haptics & tactile acoustics */}
            <p className="mt-4 max-w-[42ch] text-[13px] sm:text-[14px] leading-relaxed text-zinc-400">
              Tactile textiles, precision acoustics, and soft haptics. Curated flips for audio, bags, and workspace gear — verified and thrift-graded.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-white text-black text-[12px] font-bold tracking-wider hover:bg-[#00FFCC] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                EXPLORE DROPS <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onShuffle}
                className="px-4 py-3 rounded-full bg-[#0A0A0C] border border-zinc-800 text-[12px] text-zinc-300 hover:border-zinc-600 hover:text-white transition"
              >
                Shuffle Spotlight ↻
              </button>
            </div>

            {/* Clean Spotlight Preview Item */}
            <div className="mt-7 rounded-[18px] bg-[#0A0A0C] border border-zinc-800/80 p-3.5 flex items-center gap-3.5 max-w-[400px]">
              <div className="w-13 h-13 rounded-[12px] overflow-hidden bg-[#161616] border border-zinc-800 shrink-0">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium flex items-center gap-1">
                  <CategoryIcon className="w-2.5 h-2.5 text-[#00FFCC]" />
                  <span>{currentItem.category}</span>
                </div>
                <div className="text-[13px] font-semibold truncate text-zinc-100 mt-0.5">
                  {currentItem.name}
                </div>
                <div className="text-[#00FFCC] text-[13px] font-mono font-bold">
                  ${currentItem.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => onAddToCart(currentItem)}
                className="w-9 h-9 rounded-full bg-[#D6FF00] text-black grid place-items-center hover:scale-105 transition shadow-[0_0_12px_rgba(214,255,0,0.3)] shrink-0"
                aria-label="Add spotlight item"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Deal Bar Status */}
          <div className="relative z-10 mt-6 pt-4 border-t border-zinc-800/70">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2 font-medium">
              <span className="font-mono">SPOTLIGHT 0{currentSpotlightIndex + 1} / 0{spotlightItems.length}</span>
              <span className="text-zinc-300 flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D6FF00]" /> Curated Drop
              </span>
            </div>

            <div className="h-1.5 rounded-full bg-zinc-800/80 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00FFCC] to-[#FF00B7] transition-all duration-500"
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
                  aria-label={`Select spotlight drop ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSpotlightIndex ? 'w-6 bg-[#00FFCC]' : 'w-3 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Showcase Card */}
        <div className="relative rounded-[26px] bg-[#121215] border border-zinc-800/90 overflow-hidden min-h-[420px] lg:min-h-[480px] group flex flex-col justify-between p-6">
          <img
            src={HERO_BG}
            alt="Tactile workspace and gear setup"
            crossOrigin="anonymous"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/50 to-[#0A0A0C]/30" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFCC]/10 via-transparent to-[#FF00B7]/10 pointer-events-none" />

          {/* Top Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-wider">
              <Sparkles className="w-3 h-3 text-[#00FFCC]" />
              <span>FEATURED DROP</span>
            </div>

            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#D6FF00] text-black text-[11px] font-bold shadow-[0_0_12px_rgba(214,255,0,0.3)]">
              <Star className="w-3 h-3 fill-black text-black" />
              <span>{currentItem.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Bottom Card Summary */}
          <div className="relative z-10 bg-black/80 backdrop-blur-md border border-zinc-800 rounded-[20px] p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-[12px] overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <div className="text-[14px] font-bold text-white truncate leading-tight">
                  {currentItem.name}
                </div>
                <div className="text-zinc-400 text-[11px] mt-0.5 font-medium">
                  {currentItem.condition || 'Refurbished Mint'} • {currentItem.category}
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="text-[17px] font-mono font-bold text-[#00FFCC]">
                ${currentItem.price.toFixed(2)}
              </div>
              <button
                onClick={() => onAddToCart(currentItem)}
                className="mt-1 px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-bold tracking-wider hover:bg-[#00FFCC] transition-colors"
              >
                + ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
