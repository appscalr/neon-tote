import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, Check, Download, MessageCircle, FileText } from 'lucide-react';
import { CartItem } from '../types';
import { BrandLogo } from './BrandLogo';
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
  onOpenReceiptModal,
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
    customerEmail: email || 'shop@piedpod.online',
    paymentMethod: 'Instant Bag Order',
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
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 bottom-0 w-full lg:w-[420px] bg-[#121212] border-l border-zinc-800 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col rounded-tl-[28px] lg:rounded-none overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-zinc-800 bg-[#0F0F0F]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 grid place-items-center bg-[#0A0A0A] rounded-full border border-zinc-800/80 overflow-hidden">
              <BrandLogo size={24} showDot={false} />
            </div>
            <span className="font-bold tracking-widest text-[13px] text-white">
              BAG // {totalCount} ITEMS
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full bg-[#161616] border border-zinc-800 grid place-items-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#161616] px-6 py-2.5 border-b border-zinc-800/60 text-[10px] tracking-wider">
          <div className="flex justify-between items-center mb-1 text-zinc-400">
            <span>{isFreeShipping ? '🎉 FREE SHIPPING UNLOCKED' : `ADD $${(50 - subtotal).toFixed(2)} FOR FREE SHIPPING`}</span>
            <span className="text-[#00FFCC] font-bold">{Math.min(100, Math.round((subtotal / 50) * 100))}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#00FFCC] to-[#D6FF00] transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 50) * 100)}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#161616] border border-zinc-800 grid place-items-center mb-3">
                <ShoppingCart className="w-6 h-6 text-zinc-600" />
              </div>
              <div className="text-sm text-zinc-400 font-medium">Bag empty</div>
              <div className="text-xs text-zinc-600 mt-1">Add curated drops to get started</div>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-[16px] bg-[#161616] border border-zinc-800/80"
              >
                <div className="w-16 h-16 rounded-[12px] bg-[#0A0A0A] border border-zinc-800 overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-bold text-white truncate">
                    {item.product.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 tracking-widest mt-0.5">
                    {item.product.category} • ${item.product.price.toFixed(2)}
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full px-1">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        className="w-6 h-6 rounded-full grid place-items-center text-xs text-zinc-300 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs w-5 text-center font-bold text-zinc-100">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        className="w-6 h-6 rounded-full grid place-items-center text-xs text-zinc-300 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-[12px] font-bold text-[#00FFCC] ml-1">
                      ${(item.product.price * item.qty).toFixed(2)}
                    </span>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="ml-auto text-zinc-500 hover:text-[#FF00B7] p-1 transition"
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

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-[#0F0F0F]">
            <div className="space-y-2 text-[12px]">
              <div className="flex justify-between text-zinc-400">
                <span>SUBTOTAL</span>
                <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING {isFreeShipping ? '(FREE >$50)' : ''}</span>
                <span className={isFreeShipping ? 'text-[#00FFCC] font-bold' : 'text-zinc-200'}>
                  {isFreeShipping ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-black text-[14px] pt-2 border-t border-zinc-800 text-white">
                <span>TOTAL</span>
                <span className="text-[#00FFCC]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Instant Actions for PDF and WhatsApp */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={handleQuickPDF}
                className="h-8 rounded-full bg-[#18181f] border border-[#00FFCC]/40 text-[#00FFCC] text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#00FFCC]/10 transition"
              >
                <Download className="w-3 h-3" /> PDF RECEIPT
              </button>

              <button
                onClick={handleQuickWhatsApp}
                className="h-8 rounded-full bg-[#18181f] border border-[#25D366]/40 text-[#25D366] text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#25D366]/10 transition"
              >
                <MessageCircle className="w-3 h-3 fill-[#25D366]" /> WHATSAPP
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email for drop receipt"
                className="w-full h-10 rounded-full bg-[#0A0A0A] border border-zinc-800 px-4 text-[12px] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-zinc-600"
              />

              <button
                onClick={() => onCheckout(email, 'Apple Pay')}
                className="w-full h-12 rounded-full bg-white text-black font-bold tracking-widest text-[12px] flex items-center justify-center gap-2 hover:bg-zinc-100 shadow-[0_0_24px_rgba(255,255,255,0.25)] transition cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full bg-black text-white grid place-items-center text-[10px] font-bold">
                  
                </span>
                PAY NOW • APPLE PAY
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onCheckout(email, 'G Pay')}
                  className="h-10 rounded-full bg-[#161616] border border-zinc-800 text-[11px] font-bold tracking-widest text-zinc-200 hover:border-zinc-600 transition cursor-pointer"
                >
                  G Pay
                </button>
                <button
                  onClick={() => onCheckout(email, 'PayNow')}
                  className="h-10 rounded-full bg-[#D6FF00] text-black font-black text-[11px] tracking-widest shadow-[0_0_12px_rgba(214,255,0,0.3)] hover:brightness-110 transition cursor-pointer"
                >
                  PAYNOW
                </button>
              </div>

              <div className="text-[9px] text-center text-zinc-500 tracking-widest pt-1">
                SECURE • 1-TAP HAPTIC CHECKOUT
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
