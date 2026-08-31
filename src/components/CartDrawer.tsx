import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, Download, MessageCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { generateReceiptPDF, shareToWhatsApp, OrderReceiptData } from '../utils/pdfReceipt';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (email?: string, paymentType?: string) => void;
  onOpenReceiptModal?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  const [email, setEmail] = useState('');
  const totalCount = items.reduce((acc, cur) => acc + cur.qty, 0);
  const subtotal = items.reduce((acc, cur) => acc + cur.product.price * cur.qty, 0);
  const isFreeShipping = subtotal >= 50;
  const shippingFee = isFreeShipping || subtotal === 0 ? 0 : 4.50;
  const total = subtotal + shippingFee;

  const currentOrderData: OrderReceiptData = {
    orderNumber: `URBN-${Math.floor(Math.random() * 9000) + 1000}`,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    items,
    subtotal,
    shippingFee,
    total,
    customerEmail: email || 'collector@piedpod.online',
    paymentMethod: 'Instant Bag Checkout',
    storeName: 'PIEDPOD // NEONTOTE',
  };

  const handleQuickWhatsApp = () => {
    shareToWhatsApp(currentOrderData);
  };

  const handleQuickPDF = () => {
    generateReceiptPDF(currentOrderData);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer Container */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-full max-w-[420px] bg-[#121215] border-l border-zinc-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col shadow-2xl`}
      >
        {/* Header: Clean title without repetitive yelling */}
        <div className="p-5 flex items-center justify-between border-b border-zinc-800 bg-[#0F0F12]">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-[#00FFCC]" />
            <h2 className="font-bold text-[15px] text-white tracking-wide">
              Your Bag
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#1C1C22] border border-zinc-700 text-xs font-mono text-zinc-300">
              {totalCount}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="w-8 h-8 rounded-full bg-[#18181D] border border-zinc-800 grid place-items-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#16161B] px-5 py-2.5 border-b border-zinc-800/80 text-[11px]">
          <div className="flex justify-between items-center mb-1.5 text-zinc-400">
            <span>
              {isFreeShipping
                ? '✓ Free Metro Dispatch Unlocked'
                : `Add $${(50 - subtotal).toFixed(2)} for free dispatch`}
            </span>
            <span className="text-[#00FFCC] font-mono font-bold">
              {Math.min(100, Math.round((subtotal / 50) * 100))}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FFCC] to-[#D6FF00] transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-24 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#18181E] border border-zinc-800 grid place-items-center mb-3 text-zinc-500">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="text-sm font-semibold text-zinc-300">Your bag is empty</div>
              <div className="text-xs text-zinc-500 mt-1">Explore our drops to add curated gear</div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-[16px] bg-[#16161A] border border-zinc-800/80"
              >
                <div className="w-16 h-16 rounded-[12px] bg-[#0A0A0C] border border-zinc-800 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="text-[13px] font-semibold text-zinc-100 truncate">
                      {item.product.name}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      ${item.product.price.toFixed(2)} each
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Stepper */}
                    <div className="flex items-center bg-[#0C0C0E] border border-zinc-800 rounded-full px-1 py-0.5">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="w-5 h-5 rounded-full grid place-items-center text-zinc-400 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs w-5 text-center font-mono font-bold text-zinc-200">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="w-5 h-5 rounded-full grid place-items-center text-zinc-400 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Single Line Total */}
                    <span className="text-[13px] font-mono font-bold text-[#00FFCC]">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Clean, Non-Redundant Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-[#0F0F12] space-y-3.5">
            {/* Single-pass financial breakdown */}
            <div className="space-y-1.5 text-[12px]">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="font-mono text-zinc-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Estimated Dispatch</span>
                <span className={`font-mono ${isFreeShipping ? 'text-[#00FFCC] font-semibold' : 'text-zinc-200'}`}>
                  {isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-[14px] pt-2 border-t border-zinc-800 text-white">
                <span>Total</span>
                <span className="font-mono text-[#00FFCC]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Instant Actions (Receipt & WhatsApp) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleQuickPDF}
                className="h-8 rounded-full bg-[#18181F] border border-[#00FFCC]/40 text-[#00FFCC] text-[10px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#00FFCC]/10 transition"
              >
                <Download className="w-3 h-3" /> PDF Receipt
              </button>

              <button
                onClick={handleQuickWhatsApp}
                className="h-8 rounded-full bg-[#18181F] border border-[#25D366]/40 text-[#25D366] text-[10px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#25D366]/10 transition"
              >
                <MessageCircle className="w-3 h-3 fill-[#25D366]" /> Share WhatsApp
              </button>
            </div>

            {/* Email input for order notice */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address for tracking updates"
              className="w-full h-10 rounded-full bg-[#0A0A0C] border border-zinc-800 px-4 text-[12px] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-[#00FFCC]/60 font-mono transition"
            />

            {/* Primary Payment Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => onCheckout(email, 'Apple Pay')}
                className="w-full h-11 rounded-full bg-white text-black font-bold text-[12px] flex items-center justify-center gap-2 hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition cursor-pointer"
              >
                <span className="w-4 h-4 rounded-full bg-black text-white grid place-items-center text-[10px] font-bold">
                  
                </span>
                Pay with Apple Pay
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onCheckout(email, 'G Pay')}
                  className="h-9 rounded-full bg-[#18181E] border border-zinc-800 text-[11px] font-semibold text-zinc-200 hover:border-zinc-600 transition cursor-pointer"
                >
                  Google Pay
                </button>
                <button
                  onClick={() => onCheckout(email, 'PayNow')}
                  className="h-9 rounded-full bg-[#D6FF00] text-black font-bold text-[11px] hover:brightness-110 transition cursor-pointer"
                >
                  Instant PayNow
                </button>
              </div>
            </div>

            <div className="text-[10px] text-center text-zinc-500 flex items-center justify-center gap-1 pt-1">
              <ShieldCheck className="w-3 h-3 text-[#00FFCC]" />
              <span>14-Day Warranty &amp; Haptic Confirmation</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
