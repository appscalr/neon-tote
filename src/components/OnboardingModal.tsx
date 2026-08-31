import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CATEGORIES } from '../data/products';
import { CategoryType } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: CategoryType[];
  onToggleCategory: (cat: CategoryType) => void;
  budgetLimit: number;
  onSetBudgetLimit: (limit: number) => void;
  hapticEnabled: boolean;
  onToggleHaptic: () => void;
  onTriggerHaptic: () => void;
  onSelectPrimaryCategory: (cat: CategoryType) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  selectedCategories,
  onToggleCategory,
  budgetLimit,
  onSetBudgetLimit,
  hapticEnabled,
  onToggleHaptic,
  onTriggerHaptic,
  onSelectPrimaryCategory,
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 4) {
      if (selectedCategories.length > 0) {
        onSelectPrimaryCategory(selectedCategories[0]);
      }
      onClose();
    } else {
      setStep((s) => s + 1);
    }
  };

  const categoriesToPick = CATEGORIES.filter((c) => c !== 'ALL');

  return (
    <div className="fixed inset-0 z-[80] bg-[#0A0A0A]/90 backdrop-blur-xl grid place-items-center p-4">
      <div className="w-full max-w-[520px] rounded-[28px] bg-[#161616] border border-zinc-800 overflow-hidden shadow-[0_0_80px_rgba(0,255,204,0.15)] flex flex-col justify-between">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#0A0A0A] rounded-full border border-zinc-800/80 grid place-items-center overflow-hidden">
                <BrandLogo size={20} showDot={false} />
              </div>
              <span className="text-[11px] tracking-[0.25em] text-zinc-500 font-semibold">
                PIEDPOD // STORE
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-[11px] tracking-widest text-zinc-500 hover:text-zinc-200 transition"
            >
              SKIP →
            </button>
          </div>

          {/* Step 1: Welcome Splash */}
          {step === 1 && (
            <div className="mt-8 text-center">
              <div className="mx-auto relative w-[120px] h-[120px] rounded-[24px] bg-[#0A0A0A] border border-zinc-800/80 grid place-items-center overflow-hidden">
                <BrandLogo size={80} showDot={true} />
              </div>

              <h2 className="display mt-6 text-[28px] leading-[0.95] font-black text-white">
                WELCOME TO THE PACK
                <br />
                <span className="text-[#00FFCC]">// PIEDPOD</span>
              </h2>

              <p className="mt-3 text-[13px] leading-6 text-zinc-400 max-w-[34ch] mx-auto">
                Curated drops. Neon approved. We flip gadgets + accessories. Haptic thrift for tactile humans.
              </p>

              <div className="mt-6 flex justify-center gap-2">
                <span className="px-3 py-1.5 rounded-full bg-[#0A0A0A] border border-zinc-800 text-[10px] text-zinc-400">
                  CONCRETE TEXTURE
                </span>
                <span className="px-3 py-1.5 rounded-full bg-[#D6FF00] text-black text-[10px] font-bold">
                  SOFT-TOUCH
                </span>
              </div>
            </div>
          )}

          {/* Step 2: What's your tactile? */}
          {step === 2 && (
            <div className="mt-6">
              <h2 className="display text-[22px] font-black text-white">
                WHAT'S YOUR TACTILE?
              </h2>
              <p className="text-[12px] text-zinc-500 mt-1">
                Pick your vibe • filters the grid
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {categoriesToPick.map((cat) => {
                  const isSelected = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => onToggleCategory(cat)}
                      className={`px-4 py-2.5 rounded-full text-[11px] font-bold tracking-widest border transition-all ${
                        isSelected
                          ? 'bg-[#00FFCC] text-black border-[#00FFCC] shadow-[0_0_18px_#00FFCC]'
                          : 'bg-[#0A0A0A] text-zinc-400 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 text-[10px] text-zinc-500">
                Selected: {selectedCategories.join(', ') || 'ALL CATEGORIES'}
              </div>
            </div>
          )}

          {/* Step 3: Bag Limit */}
          {step === 3 && (
            <div className="mt-6">
              <h2 className="display text-[22px] font-black text-white">
                YOUR BAG LIMIT
              </h2>
              <p className="text-[12px] text-zinc-500 mt-1">
                We only show flips under this cap
              </p>

              <div className="mt-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] tracking-widest text-zinc-500">$10</span>
                  <span className="px-4 py-1.5 rounded-full bg-[#00FFCC] text-black font-black text-[14px] shadow-[0_0_12px_#00FFCC]">
                    ${budgetLimit}
                  </span>
                  <span className="text-[11px] tracking-widest text-zinc-500">$100</span>
                </div>

                <input
                  type="range"
                  min={10}
                  max={100}
                  value={budgetLimit}
                  onChange={(e) => onSetBudgetLimit(parseInt(e.target.value))}
                  className="w-full accent-[#00FFCC] h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />

                <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00FFCC] to-[#FF00B7]"
                    style={{ width: `${budgetLimit}%` }}
                  />
                </div>

                <div className="mt-4 text-[11px] text-zinc-400">
                  Target budget set to ${budgetLimit}. Auto-adjusts product visibility.
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Haptics */}
          {step === 4 && (
            <div className="mt-6">
              <h2 className="display text-[22px] font-black text-white">
                HAPTICS // TACTILE FEEDBACK
              </h2>
              <p className="text-[12px] text-zinc-500 mt-1">
                Long-press = vibrate + add. Feel the drop.
              </p>

              <div className="mt-6 rounded-[18px] bg-[#0A0A0A] border border-zinc-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center">
                    <Zap className="w-5 h-5 text-[#D6FF00]" />
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white">Enable haptic add?</div>
                    <div className="text-[10px] text-zinc-500">navigator.vibrate • soft 60ms</div>
                  </div>
                </div>

                <button
                  onClick={onToggleHaptic}
                  aria-label="Toggle haptic vibration"
                  className={`w-12 h-7 rounded-full p-1 transition ${
                    hapticEnabled ? 'bg-[#00FFCC]' : 'bg-zinc-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-black transition-transform ${
                      hapticEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={onTriggerHaptic}
                className="mt-4 w-full h-12 rounded-full bg-[#161616] border border-dashed border-zinc-700 text-[11px] font-bold tracking-widest text-zinc-300 hover:border-[#00FFCC]/60 transition cursor-pointer"
              >
                LONG-PRESS DEMO • CLICK TO TEST VIBRATION
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/80">
            {/* Step Dots */}
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step ? 'w-8 bg-[#00FFCC] shadow-[0_0_8px_#00FFCC]' : 'w-4 bg-zinc-800'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-full bg-[#0A0A0A] border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white"
                >
                  BACK
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-7 py-2.5 rounded-full bg-[#00FFCC] text-black text-[11px] font-black tracking-widest shadow-[0_0_20px_#00FFCC] hover:brightness-110 transition cursor-pointer"
              >
                {step === 4 ? 'ENTER PACK →' : 'NEXT →'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom accent stripe */}
        <div className="h-1 w-full bg-gradient-to-r from-[#00FFCC] via-[#FF00B7] to-[#D6FF00]" />
      </div>
    </div>
  );
};
