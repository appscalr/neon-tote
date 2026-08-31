import React from 'react';
import { Sparkles, CheckCircle, Package } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  itemCount: number;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  itemCount,
}) => {
  if (!isOpen) return null;

  const orderNum = Math.floor(Math.random() * 9000) + 1000;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[4px] animate-in" />

      <div className="relative bg-[#161616] border border-[#00FFCC]/60 rounded-[28px] p-8 max-w-[440px] w-full text-center shadow-[0_0_60px_rgba(0,255,204,0.4)]">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#00FFCC] text-black grid place-items-center mb-4 shadow-[0_0_20px_#00FFCC]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="text-[20px] font-black tracking-widest text-white">
          DROP SECURED ✓
        </div>

        <div className="text-[12px] text-zinc-300 mt-2">
          Neon pack en route • {itemCount} items • <strong className="text-[#00FFCC]">URBN-{orderNum}</strong>
        </div>

        <div className="mt-5 p-3 rounded-[16px] bg-[#0A0A0A] border border-zinc-800 text-[11px] text-zinc-400">
          Tracking initialized at Cumberland Fulfillment. Check your email for dispatch logs.
        </div>

        {/* Animated Cyber Status Bouncers */}
        <div className="mt-6 flex justify-center gap-1.5">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="w-2 h-6 rounded-full animate-bounce"
              style={{
                background: i % 3 === 0 ? '#00FFCC' : i % 3 === 1 ? '#FF00B7' : '#D6FF00',
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
