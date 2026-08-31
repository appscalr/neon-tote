import React from 'react';
import { CategoryType } from '../types';
import { CATEGORIES } from '../data/products';
import { getCategoryIcon } from '../utils/categoryIcons';
import { SlidersHorizontal, Sparkles } from 'lucide-react';

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
    <div className="space-y-4">
      {/* Sleek Ticker */}
      <div className="px-4 lg:px-8">
        <div className="rounded-full bg-[#D6FF00] text-black px-4 py-2 flex items-center justify-between overflow-hidden shadow-[0_0_14px_rgba(214,255,0,0.25)]">
          <div className="text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            <span>CURATED TACTILE DROPS • FREE DISPATCH OVER $50 • 14-DAY QUALITY GUARANTEE</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold bg-black text-[#D6FF00] px-2.5 py-0.5 rounded-full">
            <span>{itemCount} AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* Category Pills & Controls */}
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-[16px] lg:text-[18px] font-bold tracking-tight text-white">
              Curated Catalog
            </h2>
            <span className="text-xs text-zinc-500 font-mono">({itemCount})</span>
          </div>

          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141416] border border-zinc-800 text-[11px] font-medium text-zinc-300 hover:border-zinc-600 hover:text-white transition"
          >
            <SlidersHorizontal className="w-3 h-3 text-[#00FFCC]" />
            <span>Budget &amp; Vibe</span>
          </button>
        </div>

        {/* Category Pills List */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            const Icon = getCategoryIcon(cat);

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[11px] font-medium border transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#00FFCC] text-black border-[#00FFCC] font-bold shadow-[0_0_14px_rgba(0,255,204,0.35)]'
                    : 'bg-[#141416] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-black' : 'text-zinc-500'}`} />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
