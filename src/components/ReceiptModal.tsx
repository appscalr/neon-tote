import React, { useState } from 'react';
import { X, Printer, Download, Share2, MessageCircle, Copy, Check, Sparkles, FileText } from 'lucide-react';
import { CartItem } from '../types';
import { OrderReceiptData, generateReceiptPDF, printReceiptViaBrowser, shareToWhatsApp, formatWhatsAppMessage } from '../utils/pdfReceipt';
import { BrandLogo } from './BrandLogo';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderNumber?: string;
  customerEmail?: string;
  paymentMethod?: string;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  items,
  orderNumber = `URBN-${Math.floor(Math.random() * 9000) + 1000}`,
  customerEmail = 'shop@piedpod.online',
  paymentMethod = 'Apple Pay / Instant 1-Tap',
}) => {
  const [copied, setCopied] = useState(false);
  const [whatsAppPhone, setWhatsAppPhone] = useState('');
  const [customerName, setCustomerName] = useState('Valued Collector');

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
          id: 'p-default',
          name: 'PIEDPOD Verified Drop Pack',
          price: subtotal || 45.0,
          rating: 5.0,
          category: 'TECH_THRIFT',
          image: '/piedpod-logo.png',
          tags: ['BAG', 'DROPS'],
        },
        qty: 1,
      },
    ],
    subtotal: subtotal || 45.0,
    shippingFee,
    total: total || 45.0,
    customerName,
    customerEmail,
    customerPhone: whatsAppPhone,
    paymentMethod,
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

  const handleCopyText = async () => {
    const text = formatWhatsAppMessage(receiptData);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#111114] border-2 border-[#00FFCC]/80 rounded-[28px] max-w-[560px] w-full p-6 lg:p-7 shadow-[0_0_60px_rgba(0,255,204,0.35)] text-left z-10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-[#00FFCC]/50 grid place-items-center overflow-hidden p-1 shadow-[0_0_12px_rgba(0,255,204,0.3)]">
              <BrandLogo size={28} showDot={false} />
            </div>
            <div>
              <div className="text-[14px] font-black tracking-widest text-[#00FFCC] flex items-center gap-1.5">
                OFFICIAL ORDER RECEIPT
                <span className="w-2 h-2 rounded-full bg-[#D6FF00] animate-pulse" />
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                DROP ID: <strong className="text-white">#{orderNumber}</strong> • {todayStr}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#18181b] border border-zinc-700 grid place-items-center text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Bar (Top) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
          <button
            onClick={handleDownloadPDF}
            className="h-10 px-3 rounded-full bg-[#00FFCC] text-black font-bold text-[11px] tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,204,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> PDF RECEIPT
          </button>

          <button
            onClick={handlePrint}
            className="h-10 px-3 rounded-full bg-[#1e1e24] border border-zinc-700 text-white font-bold text-[11px] tracking-widest flex items-center justify-center gap-1.5 hover:border-[#00FFCC] active:scale-95 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#00FFCC]" /> PRINT / SAVE
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="col-span-2 sm:col-span-1 h-10 px-3 rounded-full bg-[#25D366] text-black font-extrabold text-[11px] tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-black" /> WHATSAPP
          </button>
        </div>

        {/* WhatsApp Direct Share Input Box */}
        <div className="bg-[#18181f] border border-zinc-800 rounded-[18px] p-3.5 mb-4">
          <div className="flex items-center justify-between text-[11px] font-bold text-zinc-300 mb-2">
            <span className="flex items-center gap-1.5 text-[#25D366]">
              <MessageCircle className="w-3.5 h-3.5 fill-[#25D366]" /> Direct Instant Share to WhatsApp
            </span>
            <button
              onClick={handleCopyText}
              className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full transition"
            >
              {copied ? <Check className="w-3 h-3 text-[#00FFCC]" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied Receipt!' : 'Copy Text'}
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="tel"
              value={whatsAppPhone}
              onChange={(e) => setWhatsAppPhone(e.target.value)}
              placeholder="Recipient WhatsApp (+263 77... / Optional)"
              className="flex-1 h-9 rounded-full bg-[#0A0A0A] border border-zinc-800 px-3 text-[11px] text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-[#25D366] transition"
            />
            <button
              onClick={handleWhatsAppShare}
              className="h-9 px-4 rounded-full bg-[#25D366] text-black font-bold text-[10px] tracking-wider hover:brightness-110 transition shrink-0"
            >
              SEND NOW
            </button>
          </div>
          <p className="text-[9px] text-zinc-500 mt-1.5">
            Leave blank to pick any contact in WhatsApp, or enter an international phone number.
          </p>
        </div>

        {/* Receipt Document Preview Card */}
        <div className="bg-[#09090b] border border-zinc-800 rounded-[20px] p-4 font-mono text-[11px] max-h-[260px] overflow-y-auto space-y-3">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 border-b border-zinc-800/80 pb-2">
            <span>STORE: <strong>PIEDPOD // BULAWAYO</strong></span>
            <span className="text-[#00FFCC] font-bold">PAID & VERIFIED</span>
          </div>

          {/* Items Breakdown */}
          <div className="space-y-2">
            {receiptData.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-zinc-200">
                <div className="pr-2">
                  <div className="font-bold text-white text-[12px]">{item.product.name}</div>
                  <div className="text-[10px] text-zinc-500">{item.qty} × ${item.product.price.toFixed(2)} ({item.product.category})</div>
                </div>
                <div className="font-bold text-[#00FFCC] shrink-0 text-[12px]">
                  ${(item.product.price * item.qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Box */}
          <div className="border-t border-zinc-800 pt-2 space-y-1 text-zinc-400">
            <div className="flex justify-between">
              <span>SUBTOTAL:</span>
              <span className="text-zinc-200">${receiptData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>SHIPPING:</span>
              <span className={receiptData.shippingFee === 0 ? 'text-[#00FFCC] font-bold' : 'text-zinc-200'}>
                {receiptData.shippingFee === 0 ? 'FREE ($0.00)' : `$${receiptData.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-[13px] font-black text-white pt-1 border-t border-zinc-800/60">
              <span className="text-[#FF00B7]">TOTAL PAID:</span>
              <span className="text-[#00FFCC]">${receiptData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-400">
          <span className="flex items-center gap-1 text-zinc-500">
            <Sparkles className="w-3 h-3 text-[#D6FF00]" /> 14-Day Quality Guarantee
          </span>
          <span className="text-zinc-500">Suite 15 Cumberland Fulfillment</span>
        </div>
      </div>
    </div>
  );
};
