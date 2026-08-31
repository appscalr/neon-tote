import React, { useState } from 'react';
import { Sparkles, Download, Printer, MessageCircle, X, ShieldCheck } from 'lucide-react';
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
          rating: 5.0,
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
    customerEmail: 'collector@piedpod.online',
    customerPhone: whatsAppPhone,
    paymentMethod: 'Instant 1-Tap Checkout',
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
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in" 
      />

      <div className="relative bg-[#141418] border border-[#00FFCC]/50 rounded-[26px] p-6 lg:p-8 max-w-[460px] w-full text-center shadow-[0_0_50px_rgba(0,255,204,0.25)] z-10 animate-in space-y-4">
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1C1C24] border border-zinc-800 text-zinc-400 hover:text-white grid place-items-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="w-14 h-14 mx-auto rounded-full bg-[#00FFCC] text-black grid place-items-center shadow-[0_0_20px_#00FFCC]">
          <Sparkles className="w-7 h-7" />
        </div>

        <div>
          <h3 className="text-[20px] font-bold text-white tracking-tight">
            Drop Secured!
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Order confirmed • {itemCount} item{itemCount > 1 ? 's' : ''} • <span className="text-[#00FFCC] font-mono font-bold">{orderNumber}</span>
          </p>
        </div>

        <div className="p-3.5 rounded-[16px] bg-[#0A0A0C] border border-zinc-800 text-xs text-zinc-300 text-left space-y-1">
          <div className="flex justify-between text-zinc-400">
            <span>Total Paid</span>
            <span className="text-[#00FFCC] font-mono font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Fulfillment</span>
            <span>Cumberland Logistics Hub</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownloadPDF}
              className="h-10 rounded-full bg-[#00FFCC] text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,204,0.25)] hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> PDF Receipt
            </button>

            <button
              onClick={handlePrint}
              className="h-10 rounded-full bg-[#1C1C24] border border-zinc-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 hover:border-[#00FFCC] active:scale-95 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#00FFCC]" /> Print Receipt
            </button>
          </div>

          <div className="bg-[#0A0A0C] border border-zinc-800 rounded-full p-1.5 flex items-center gap-2">
            <input
              type="tel"
              value={whatsAppPhone}
              onChange={(e) => setWhatsAppPhone(e.target.value)}
              placeholder="WhatsApp No. (optional)"
              className="flex-1 h-8 rounded-full bg-transparent px-3 text-xs text-zinc-200 placeholder:text-zinc-600 outline-none"
            />
            <button
              onClick={handleWhatsAppShare}
              className="h-8 px-4 rounded-full bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(37,211,102,0.3)] hover:brightness-110 active:scale-95 transition cursor-pointer shrink-0"
            >
              <MessageCircle className="w-3 h-3 fill-black" /> Share
            </button>
          </div>
        </div>

        {onClose && (
          <div className="pt-2">
            <button
              onClick={onClose}
              className="text-xs text-zinc-400 hover:text-white underline transition"
            >
              Continue Browsing Drops
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
