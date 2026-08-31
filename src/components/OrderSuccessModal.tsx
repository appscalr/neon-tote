import React, { useState } from 'react';
import { Sparkles, Download, Printer, MessageCircle, CheckCircle, X, ArrowRight, Share2 } from 'lucide-react';
import { CartItem } from '../types';
import { generateReceiptPDF, printReceiptViaBrowser, shareToWhatsApp, OrderReceiptData } from '../utils/pdfReceipt';

interface OrderSuccessModalProps {
  isOpen: boolean;
  itemCount: number;
  items?: CartItem[];
  orderNumber?: string;
  onClose?: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  itemCount,
  items = [],
  orderNumber = `URBN-${Math.floor(Math.random() * 9000) + 1000}`,
  onClose,
}) => {
  const [whatsAppPhone, setWhatsAppPhone] = useState('');
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, cur) => acc + cur.product.price * cur.qty, 0);
  const isFreeShipping = subtotal >= 50 || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 4.5;
  const total = subtotal + shippingFee;
  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const receiptData: OrderReceiptData = {
    orderNumber,
    date: todayStr,
    items: items.length > 0 ? items : [
      {
        product: {
          id: 'p-drop',
          name: 'PIEDPOD Cyber Drop Pack',
          price: subtotal || 45.0,
          category: 'COLLECTIBLE',
          image: '/piedpod-logo.png',
          tags: ['BAG', 'DROPS'],
        },
        qty: itemCount || 1,
      },
    ],
    subtotal: subtotal || 45.0,
    shippingFee,
    total: total || 45.0,
    customerEmail: 'shop@piedpod.online',
    customerPhone: whatsAppPhone,
    paymentMethod: 'Apple Pay / Instant Checkout',
    storeName: 'PIEDPOD // NEONTOTE',
  };

  const handleDownloadPDF = () => {
    generateReceiptPDF(receiptData);
  };

  const handlePrint = () => {
    printReceiptViaBrowser(receiptData);
  };

  const handleWhatsAppShare = () => {
    shareToWhatsApp(receiptData, whatsAppPhone);
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center p-4">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-[6px] animate-in" 
      />

      <div className="relative bg-[#141417] border-2 border-[#00FFCC]/70 rounded-[28px] p-6 lg:p-8 max-w-[480px] w-full text-center shadow-[0_0_60px_rgba(0,255,204,0.4)] z-10 animate-in">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white grid place-items-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="w-16 h-16 mx-auto rounded-full bg-[#00FFCC] text-black grid place-items-center mb-4 shadow-[0_0_24px_#00FFCC]">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="text-[20px] font-black tracking-widest text-white">
          DROP SECURED ✓
        </div>

        <div className="text-[12px] text-zinc-300 mt-2">
          Neon pack en route • {itemCount} items • <strong className="text-[#00FFCC] font-mono">{orderNumber}</strong>
        </div>

        <div className="mt-4 p-3 rounded-[16px] bg-[#0A0A0A] border border-zinc-800 text-[11px] text-zinc-400">
          Tracking initialized at Cumberland Fulfillment Hub. Instant receipt &amp; share options ready below:
        </div>

        {/* PDF & WhatsApp Instant Actions */}
        <div className="mt-5 space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadPDF}
              className="h-11 rounded-full bg-[#00FFCC] text-black font-extrabold text-[11px] tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,204,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Download className="w-4 h-4" /> PDF RECEIPT
            </button>

            <button
              onClick={handlePrint}
              className="h-11 rounded-full bg-[#1e1e24] border border-zinc-700 text-white font-bold text-[11px] tracking-wider flex items-center justify-center gap-1.5 hover:border-[#00FFCC] active:scale-95 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#00FFCC]" /> PRINT RECEIPT
            </button>
          </div>

          <div className="bg-[#0A0A0A] border border-zinc-800/80 rounded-[18px] p-2.5 flex items-center gap-2">
            <input
              type="tel"
              value={whatsAppPhone}
              onChange={(e) => setWhatsAppPhone(e.target.value)}
              placeholder="WhatsApp No. (+263... optional)"
              className="flex-1 h-9 rounded-full bg-[#141418] border border-zinc-800 px-3 text-[11px] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-[#25D366]"
            />
            <button
              onClick={handleWhatsAppShare}
              className="h-9 px-4 rounded-full bg-[#25D366] text-black font-black text-[11px] tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-black" /> SHARE
            </button>
          </div>
        </div>

        {/* Animated Cyber Status Bouncers */}
        <div className="mt-5 flex justify-center gap-1.5">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="w-2 h-5 rounded-full animate-bounce"
              style={{
                background: i % 3 === 0 ? '#00FFCC' : i % 3 === 1 ? '#FF00B7' : '#D6FF00',
                animationDelay: `${i * 0.08}s`,
              }}
            />
          ))}
        </div>

        {onClose && (
          <div className="mt-4">
            <button
              onClick={onClose}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 underline tracking-wider transition"
            >
              Back to Catalog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
