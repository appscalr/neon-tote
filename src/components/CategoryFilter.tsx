import React from 'react';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
  itemCount: number;
  maxBudget: number;
  onOpenPreferences: () => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  itemCount,
  maxBudget,
  onOpenPreferences,
}) => {
  return (
    <div className="space-y-6">
      {/* Neo Marquee Ticker */}
      <div className="px-4 lg:px-8">
        <div className="rounded-full bg-[#D6FF00] text-black px-4 py-2.5 flex items-center gap-3 overflow-hidden shadow-[0_0_15px_rgba(214,255,0,0.3)]">
          <div className="text-[11px] font-black tracking-widest shrink-0 uppercase animate-marquee">
            REAL DROPS • DESKTOP • LAPTOP • SMARTPHONE • AUDIO • BAG • WEAR • LONG-PRESS = HAPTIC ADD • BAG LIMIT ${maxBudget} • NEON APPROVED •
          </div>
          <div className="hidden lg:flex items-center gap-2 text-[10px] ml-auto shrink-0">
            <span className="px-2 py-0.5 rounded-full bg-black text-[#D6FF00] font-bold">
              LIVE
            </span>
            <span className="font-bold">{itemCount} ITEMS</span>
          </div>
        </div>
      </div>

      {/* Grid Filter Bar */}
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="display text-[18px] lg:text-[22px] font-bold tracking-tight text-white flex items-center gap-2">
            TACTILE GRID // 00{itemCount}
          </h2>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] tracking-widest text-zinc-500">FILTERED BY</span>
            <span className="px-2.5 py-1 rounded-full bg-[#00FFCC] text-black text-[10px] font-bold shadow-[0_0_10px_#00FFCC]">
              {selectedCategory}
            </span>
            <button
              onClick={onOpenPreferences}
              className="px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-700 text-[10px] text-zinc-300 hover:border-zinc-500 transition"
            >
              EDIT VIBE
            </button>
          </div>
        </div>

        {/* Category Pills List */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[11px] font-bold tracking-widest border transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#00FFCC] text-black border-[#00FFCC] shadow-[0_0_18px_rgba(0,255,204,0.5)]'
                    : 'bg-[#161616] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 flex items-center gap-2 lg:hidden text-[10px] text-zinc-500 tracking-widest">
          <span>ACTIVE: <strong className="text-zinc-300">{selectedCategory}</strong></span>
          <span>• LONG-PRESS CARD = HAPTIC ADD</span>
        </div>
      </div>
    </div>
  );
};
